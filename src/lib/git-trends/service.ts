import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from "fs";
import path from "path";
import type { GitTrendsSnapshot, TrendingPeriod, TrendingRepo } from "@/types/git-trends";
import fallbackSnapshot from "@/data/git-trends.json";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "git-trends.json",
);

const LANGUAGE_COLOR_MAP: Record<string, string> = {
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

const PERIOD_LABELS: Record<TrendingPeriod, string> = {
  daily: "hari ini",
  weekly: "minggu ini",
  monthly: "bulan ini",
};

/**
 * Mengambil data trending live langsung dari HTML https://github.com/trending
 */
export async function scrapeGitHubTrending(
  since: TrendingPeriod = "daily",
): Promise<TrendingRepo[]> {
  const url = `https://github.com/trending?since=${since}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} saat scrape ${url}`);
  }

  const html = await response.text();
  const articles =
    html.match(/<article class="Box-row"[^>]*>([\s\S]*?)<\/article>/g) || [];

  const periodLabel = PERIOD_LABELS[since] || "hari ini";

  return articles.slice(0, 15).map((article, idx) => {
    // Repo path & name
    const repoMatch = article.match(
      /<h2 class="h3 lh-condensed">[\s\S]*?<a[^>]*href="\/([^"]+)"[^>]*>/,
    );
    const fullPath = repoMatch ? repoMatch[1].trim() : "";
    const parts = fullPath.split("/");
    const owner = parts[0] || "";
    const repoName = parts[1] || "";

    // Description
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

    // Programming language
    const langMatch = article.match(
      /<span itemprop="programmingLanguage">([^<]+)<\/span>/,
    );
    const language = langMatch ? langMatch[1].trim() : "Other";

    // Stars & Forks
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

    // Stars in period
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
        trendingReason: `Mendapatkan lonjakan aktivitas komunitas pengembang global dengan pertambahan +${starsPeriod.toLocaleString()} bintang ${periodLabel}.`,
      },
    };
  });
}

export async function getLocalGitTrends(): Promise<GitTrendsSnapshot> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(raw) as GitTrendsSnapshot;
  } catch (err) {
    console.warn(
      "Gagal membaca file lokal git-trends.json, menggunakan fallback:",
      err,
    );
    return fallbackSnapshot as unknown as GitTrendsSnapshot;
  }
}

export async function summarizeRepoWithAI(
  repoName: string,
  description: string,
  language: string,
): Promise<{ overview: string; trendingReason: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return {
      overview:
        description ||
        `Repositori open-source ${repoName} berbasis ${language} untuk pengembangan perangkat lunak modern.`,
      trendingReason:
        "Tingginya aktivitas kontribusi dan adopsi luas oleh komunitas pengembang global.",
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const prompt = `Anda adalah kurator teknologi senior. Berikan ringkasan ringkas dalam Bahasa Indonesia baku yang jelas untuk repositori GitHub berikut:
Nama: ${repoName}
Bahasa: ${language}
Deskripsi: ${description || "Tidak ada deskripsi"}

ATURAN KETAT:
1. DILARANG MENGGUNAKAN EMOJI DALAM BENTUK APA PUN.
2. Format output WAJIB JSON persis dengan struktur:
{
  "overview": "1 kalimat padat tentang fungsi utama atau kegunaan repositori ini.",
  "trendingReason": "1 kalimat padat tentang alasan mengapa repositori ini relevan atau ramai dibicarakan hari ini."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return {
      overview:
        parsed.overview ||
        description ||
        "Repositori yang sedang aktif dikembangkan oleh komunitas open-source.",
      trendingReason:
        parsed.trendingReason ||
        "Mendapatkan traksi signifikan dari komunitas pengembang global.",
    };
  } catch (error) {
    console.error(`AI summary error for ${repoName}:`, error);
    return {
      overview:
        description ||
        `Proyek ${repoName} berbasis ${language} untuk solusi rekayasa perangkat lunak modern.`,
      trendingReason:
        "Lonjakan kontribusi dan adopsi luas dalam ekosistem teknologi terkini.",
    };
  }
}

export async function refreshGitTrends(): Promise<GitTrendsSnapshot> {
  let daily: TrendingRepo[] = [];
  let weekly: TrendingRepo[] = [];
  let monthly: TrendingRepo[] = [];

  try {
    daily = await scrapeGitHubTrending("daily");
    weekly = await scrapeGitHubTrending("weekly");
    monthly = await scrapeGitHubTrending("monthly");
  } catch (err) {
    console.warn("Gagal scrape live github trending:", err);
    const current = await getLocalGitTrends();
    daily = current.daily || current.repositories || [];
    weekly = current.weekly || [];
    monthly = current.monthly || [];
  }

  // Format timestamp WIB
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(now);
  const formattedUpdatedAt = `Diperbarui ${formattedDate} WIB`;

  // Ringkas top harian dengan AI jika API Key tersedia
  for (const repo of daily.slice(0, 8)) {
    const aiSummary = await summarizeRepoWithAI(
      repo.name,
      repo.description,
      repo.language,
    );
    repo.aiSummary = aiSummary;
  }

  const newSnapshot: GitTrendsSnapshot = {
    updatedAt: now.toISOString(),
    formattedUpdatedAt,
    daily,
    weekly,
    monthly,
    repositories: daily,
  };

  try {
    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(newSnapshot, null, 2),
      "utf-8",
    );
  } catch (err) {
    console.error("Gagal menyimpan snapshot git-trends.json:", err);
  }

  return newSnapshot;
}
