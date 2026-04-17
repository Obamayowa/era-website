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
            S.listItem().title('🏠 Homepage').child(
              S.document().schemaType('homePage').documentId('homePage')
            ),
            S.divider(),

            S.listItem().title('🖼️ Gallery Page').child(
              S.document().schemaType('galleryPage').documentId('galleryPage')
            ),
            S.documentTypeListItem('artwork').title('🎨 Artworks'),
            S.divider(),

            S.listItem().title('🛒 Marketplace Page').child(
              S.document().schemaType('marketplacePage').documentId('marketplacePage')
            ),
            S.listItem().title('🔨 Auctions Page').child(
              S.document().schemaType('auctionsPage').documentId('auctionsPage')
            ),
            S.documentTypeListItem('auctionListing').title('🔨 Auction Listings'),
            S.listItem().title('✏️ Commissions Page').child(
              S.document().schemaType('commissionsPage').documentId('commissionsPage')
            ),
            S.divider(),

            S.listItem().title('🌿 About ERA').child(
              S.document().schemaType('aboutPage').documentId('aboutPage')
            ),
            S.listItem().title('🏛️ Institution Pages').child(
              S.document().schemaType('institutionPage').documentId('institutionPage')
            ),
            S.documentTypeListItem('artist').title('👤 Artists'),
            S.divider(),

            S.listItem().title('🎭 Artist Portal Page').child(
              S.document().schemaType('artistPortalPage').documentId('artistPortalPage')
            ),
            S.divider(),

            S.listItem().title('🔗 Navigation & Footer').child(
              S.document().schemaType('navigation').documentId('navigation')
            ),
            S.listItem().title('⚙️ Site Settings').child(
              S.document().schemaType('settings').documentId('settings')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
