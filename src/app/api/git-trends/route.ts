import { NextResponse } from "next/server";
import { getLocalGitTrends, refreshGitTrends } from "@/lib/git-trends/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLocalGitTrends();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/git-trends error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data GitHub trends" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.CRON_SECRET;

    // Jika CRON_SECRET dikonfigurasi, validasi bearer token
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const refreshedData = await refreshGitTrends();
    return NextResponse.json({
      message: "Data GitHub Trends berhasil diperbarui",
      data: refreshedData,
    });
  } catch (error) {
    console.error("POST /api/git-trends error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data GitHub trends" },
      { status: 500 },
    );
  }
}
