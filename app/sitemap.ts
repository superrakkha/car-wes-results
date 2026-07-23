import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { AREAS, CONDITIONS, MAKERS } from "@/data/filterOptions";
import { getPublishedResults } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.siteUrl.replace(/\/$/, "");
  const results = await getPublishedResults();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    ...MAKERS.map((m) => ({
      url: `${base}/maker/${m.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...AREAS.map((a) => ({
      url: `${base}/area/${a.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...CONDITIONS.map((c) => ({
      url: `${base}/condition/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  const resultEntries: MetadataRoute.Sitemap = results.map((r) => ({
    url: `${base}/results/${r.slug}`,
    lastModified: r.purchaseDate,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...resultEntries];
}
