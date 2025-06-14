import { StructureResolver } from 'sanity/desk'

// @ts-ignore - Using any type for Sanity structure
export const structure: StructureResolver = (S) =>
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
