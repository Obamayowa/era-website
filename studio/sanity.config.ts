import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'era-studio',
  title: 'ERA — Everything Recycled Arts',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'foi8z958',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('ERA Content')
          .items([
            S.listItem()
              .title('🏠 Homepage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('🌿 About ERA')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.divider(),
            S.documentTypeListItem('artwork').title('🖼️ Artworks'),
            S.documentTypeListItem('artist').title('👤 Artists'),
            S.divider(),
            S.listItem()
              .title('⚙️ Site Settings')
              .child(S.document().schemaType('settings').documentId('settings')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
