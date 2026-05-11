export async function GET(request: Request) {
  try {
    // Ambil IP dari header
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "";

    const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)",
        "Accept": "application/json",
      },
      next: { revalidate: 3600 }, // cache 1 jam
    });

    if (!res.ok) throw new Error(`ipapi error: ${res.status}`);

    const data = await res.json();

    if (!data.latitude || !data.longitude) throw new Error("No coordinates");

    return Response.json({
      city: data.city ?? "Unknown",
      country_name: data.country_name ?? "Unknown",
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
    });
  } catch (e) {
    console.error("Geo error:", e);
    // Fallback: Singapore (dekat Indonesia)
    return Response.json({
      city: "Singapore",
      country_name: "Singapore",
      latitude: 1.3521,
      longitude: 103.8198,
    });
  }
}