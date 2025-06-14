import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dataVisualization',
  title: 'Data Visualization',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'chartType', title: 'Chart Type', type: 'string', options: { list: ['bar', 'line', 'pie'] } }),
    defineField({ name: 'data', title: 'Data (JSON)', type: 'text', description: 'Paste chart data as JSON.' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: {
      title: 'title',
      chartType: 'chartType',
    },
    // @ts-ignore
    prepare(selection) {
      const { title, chartType } = selection
      return {
        title: title || 'Data Visualization',
        subtitle: chartType ? `Type: ${chartType}` : '',
      }
    },
  },
}) 