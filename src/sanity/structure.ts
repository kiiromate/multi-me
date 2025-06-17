import { type StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings')),
    ])
