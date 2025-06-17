import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'url',
      title: 'Site URL',
      type: 'url',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'text',
        },
      ],
    },
    {
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
    },
    // Default SEO fields
    { name: 'seoTitle', title: 'Default SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'Default SEO Description', type: 'text' },
    { name: 'seoImage', title: 'Default SEO Image', type: 'image' },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}) 