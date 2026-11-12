import type { MetadataRoute } from "next";
import { ALL_WORK_ENTRIES } from "@/constants/works";
import { CPNS_PACKAGES } from "@/lib/cpns";

const BASE_URL = "https://www.htsolution.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/works`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/git-trends`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab/cat-simulator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = ALL_WORK_ENTRIES.map((entry) => ({
    url: `${BASE_URL}/works/${entry.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const catSimulatorRoutes: MetadataRoute.Sitemap = CPNS_PACKAGES.map((pkg) => ({
    url: `${BASE_URL}/lab/cat-simulator/${pkg.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...catSimulatorRoutes];
}
