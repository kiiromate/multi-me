import { type StructureResolver, type StructureBuilder } from 'sanity/desk'

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(
          S.documentList()
            .title('Posts')
            .filter('_type == "post"')
        ),
      S.listItem()
        .title('Projects')
        .child(
          S.documentList()
            .title('Projects')
            .filter('_type == "project"')
        ),
      S.listItem()
        .title('Site Settings')
        .child(
          S.documentList()
            .title('Site Settings')
            .filter('_type == "siteSettings"')
        ),
    ])
