import { defineField, defineType, type Rule } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: Rule) => Rule.required() }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: (Rule: Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'detailedDescription', title: 'Detailed Description', type: 'array', of: [{ type: 'block' }, { type: 'image' }, { type: 'dataVisualization' }] }),
    defineField({ name: 'technologiesUsed', title: 'Technologies Used', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'repoUrl', title: 'Repository URL', type: 'url' }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    // SEO fields
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'seoImage', title: 'SEO Image', type: 'image' }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'date',
    },
  },
}) 