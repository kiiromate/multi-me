// @ts-ignore - Using any for schema types
import post from './post'
import project from './project'
import siteSettings from './siteSettings'
import dataVisualization from './dataVisualization'

export const schema: { types: any[] } = {
  types: [post, project, siteSettings, dataVisualization],
}
