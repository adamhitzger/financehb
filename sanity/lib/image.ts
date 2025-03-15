import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export function urlForImage(source: SanityImageSource | undefined) {
  // Return a placeholder if no image is provided
  if (!source) {
    return "https://financehb-ifkh.vercel.app/placeholder.jpg"
  }

  // Build and return the image URL
  return imageBuilder.image(source).auto("format").width(600).url()
}
