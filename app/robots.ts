import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl: string = "https://financehb.cz"

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/studio',
          '/paywall:slug',
          '/user',
          '/log-in',
          '/sign-in',
          '/update-pass',
          '/payment/success',
          '/payment/cancelled'
        ],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: [
          '/studio',
          '/paywall:slug',
          '/user',
          '/log-in',
          '/sign-in',
          '/update-pass',
          '/payment/success',
          '/payment/cancelled'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/studio',
          '/paywall:slug',
          '/user',
          '/log-in',
          '/sign-in',
          '/update-pass',
          '/payment/success',
          '/payment/cancelled'
        ],
      },
      // Všichni ostatní roboti = blokace celého webu
      {
        userAgent: '*',
        disallow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
