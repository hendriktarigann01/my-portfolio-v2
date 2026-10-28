import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "git-trends.json");

const LANGUAGE_COLOR_MAP = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
  Shell: "#89e051",
  Other: "#a0aab2",
};

const PERIOD_LABELS = {
  daily: "hari ini",
  weekly: "minggu ini",
  monthly: "bulan ini",
};

async function scrapeTrendingPeriod(since = "daily") {
  const url = `https://github.com/trending?since=${since}`;
  console.log(`[Git Trends] Mengambil ${url}...`);

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal fetch ${url}: status ${response.status}`);
  }

  const html = await response.text();
  const articles =
    html.match(/<article class="Box-row"[^>]*>([\s\S]*?)<\/article>/g) || [];

  const periodLabel = PERIOD_LABELS[since] || "hari ini";

  return articles.slice(0, 15).map((article, idx) => {
    const repoMatch = article.match(
      /<h2 class="h3 lh-condensed">[\s\S]*?<a[^>]*href="\/([^"]+)"[^>]*>/,
    );
    const fullPath = repoMatch ? repoMatch[1].trim() : "";
    const parts = fullPath.split("/");
    const owner = parts[0] || "";
    const repoName = parts[1] || "";

    const descMatch = article.match(
      /<p class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/,
    );
    const rawDesc = descMatch ? descMatch[1] : "";
    const description = rawDesc
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .trim();

    const langMatch = article.match(
      /<span itemprop="programmingLanguage">([^<]+)<\/span>/,
    );
    const language = langMatch ? langMatch[1].trim() : "Other";

    const stargazersMatch = article.match(
      /href="\/[^"]+\/stargazers"[^>]*>[\s\S]*?<\/svg>\s*([\d,]+)/,
    );
    const stars = stargazersMatch
      ? parseInt(stargazersMatch[1].replace(/,/g, ""), 10)
      : 0;

    const forksMatch = article.match(
      /href="\/[^"]+\/forks"[^>]*>[\s\S]*?<\/svg>\s*([\d,]+)/,
    );
    const forks = forksMatch
      ? parseInt(forksMatch[1].replace(/,/g, ""), 10)
      : 0;

    const periodMatch = article.match(
      /([\d,]+)\s+stars\s+(today|this week|this month)/i,
    );
    const starsPeriod = periodMatch
      ? parseInt(periodMatch[1].replace(/,/g, ""), 10)
      : 0;

    const safeId = `${since}-${fullPath.replace(/\//g, "-").toLowerCase()}`;

    return {
      id: safeId,
      rank: idx + 1,
      name: fullPath,
      owner,
      repoName,
      url: `https://github.com/${fullPath}`,
      description,
      language,
      languageColor: LANGUAGE_COLOR_MAP[language] || "#888888",
      stars,
      forks,
      starsPeriod,
      periodLabel,
      aiSummary: {
        overview:
          description ||
          `Repositori open-source ${fullPath} berbasis ${language} untuk pengembangan aplikasi modern.`,
      },
    };
  });
}

async function summarizeBatchWithAI(apiKey, repos) {
  if (!apiKey || apiKey === "your_gemini_api_key_here") return;

  console.log("[Git Trends] Menghubungi Gemini AI (Single Batch Request)...");
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const items = repos.map((r, i) => ({
      index: i,
      name: r.name,
      description: r.description || "Tidak ada deskripsi",
      language: r.language,
    }));

    const prompt = `Anda adalah kurator teknologi senior. Berikan ringkasan padat 1 kalimat dalam Bahasa Indonesia untuk masing-masing repositori open-source berikut:
${JSON.stringify(items, null, 2)}

ATURAN KETAT:
1. DILARANG MENGGUNAKAN EMOJI DALAM BENTUK APA PUN.
2. Format output WAJIB array JSON persis dengan struktur:
[
  { "index": 0, "overview": "1 kalimat padat tentang fungsi utama repositori ini." }
]`;

    // Timeout 10 detik agar tidak pernah menggantung jika server Google 503
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout 10s pemanggilan Google API")), 10000)
    );

    const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
    const parsed = JSON.parse(result.response.text());

    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (repos[item.index] && item.overview) {
          repos[item.index].aiSummary = { overview: item.overview };
        }
      }
      console.log(`[Git Trends] Sukses merangkum ${parsed.length} repositori dengan Gemini AI.`);
    }
  } catch (err) {
    console.warn(`[Git Trends] Info: Google Gemini sedang sibuk (${err.message}). Menggunakan deskripsi asli secara instan.`);
  }
}

async function main() {
  console.log("[Git Trends] Memulai pembaruan tren GitHub (Daily, Weekly, Monthly)...");

  const now = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(now);
  const formattedUpdatedAt = `Diperbarui ${formattedDate} WIB`;

  const daily = await scrapeTrendingPeriod("daily");
  const weekly = await scrapeTrendingPeriod("weekly");
  const monthly = await scrapeTrendingPeriod("monthly");

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    await summarizeBatchWithAI(apiKey, daily);
  }

  const snapshot = {
    updatedAt: now.toISOString(),
    formattedUpdatedAt,
    daily,
    weekly,
    monthly,
    repositories: daily,
  };

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(snapshot, null, 2), "utf-8");
  console.log(`[Git Trends] Selesai! Data tersimpan di ${DATA_FILE_PATH} (${formattedUpdatedAt})`);
}

main().catch((err) => {
  console.error("[Git Trends] Fatal error:", err);
  process.exit(1);
});
