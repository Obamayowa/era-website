import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Main Headline',
      type: 'string',
      description: 'Big bold text at the top of the homepage',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero — Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero — Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroCTALabel',
      title: 'Hero — Button Text',
      type: 'string',
      placeholder: 'e.g. Explore the Gallery',
    }),

    // Stats strip
    defineField({
      name: 'stats',
      title: 'Impact Stats (the numbers strip)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Number (e.g. 2.4)', type: 'string' },
            { name: 'unit', title: 'Unit (e.g. tonnes, artists)', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),

    // Featured artworks
    defineField({
      name: 'featuredArtworks',
      title: 'Featured Artworks (shown on homepage)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      validation: (R) => R.max(6),
    }),

    // Mission section
    defineField({
      name: 'missionHeadline',
      title: 'Mission Section — Headline',
      type: 'string',
    }),
    defineField({
      name: 'missionText',
      title: 'Mission Section — Text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    },
  },
})
