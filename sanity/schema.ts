import { SchemaTypeDefinition,  } from 'sanity'
import { ebookType } from './schemas/ebook'
import { reviewType } from './schemas/review'
import { subsType } from './schemas/subs'
import { articleType } from './schemas/articles'
import { realityType } from './schemas/reality'
import { socialFeedType } from './schemas/socialfeed'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ebookType, reviewType, subsType, articleType, realityType, socialFeedType],
}
