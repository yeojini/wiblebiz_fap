import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: '/sitemap.xml', // 검색엔진에서는 절대 경로를 권장함
  };
}
