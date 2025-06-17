import { type SchemaTypeDefinition } from 'sanity'

import post from './post'
import project from './project'
import siteSettings from './siteSettings'
import dataVisualization from './dataVisualization'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, siteSettings, dataVisualization],
}
