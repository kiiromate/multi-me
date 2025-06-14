import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // @ts-ignore
    defineField({ name: 'title', title: 'Site Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    // Default SEO fields
    defineField({ name: 'seoTitle', title: 'Default SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'Default SEO Description', type: 'text' }),
    defineField({ name: 'seoImage', title: 'Default SEO Image', type: 'image' }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}) 