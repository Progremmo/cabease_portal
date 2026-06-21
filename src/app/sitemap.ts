import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cabease.in'
  
  const routes = [
    '',
    '/about',
    '/features',
    '/solutions',
    '/pricing',
    '/contact',
    '/blog',
    '/careers',
    '/book-demo',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
