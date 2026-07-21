import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://www.avery.com/software/background-remover", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 }]; }
