/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import { structureTool } from 'sanity/structure'
export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
