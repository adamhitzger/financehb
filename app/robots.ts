import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl: string = "https://financehb.cz"
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ["/studio", "/paywall:slug", "/user", "/log-in", "/sign-in", "/update-pass", "/payment/success", "/payment/cancelled"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}