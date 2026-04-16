import { defineField, defineType } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: 'material',
      title: 'Primary Material',
      type: 'string',
      options: {
        list: [
          'Ocean Plastic',
          'Metal / Steel',
          'Textile',
          'E-Waste',
          'Paper / Cardboard',
          'Glass',
          'Wood',
          'Mixed Media',
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (cm)',
      type: 'string',
      placeholder: 'e.g. 80 × 60 × 20',
    }),
    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Sculpture', 'Painting', 'Installation', 'Textile', 'Mixed Media', 'Photography'],
      },
    }),
    defineField({
      name: 'certificationLevel',
      title: 'Certification Level',
      type: 'string',
      options: {
        list: [
          { title: 'Level 1 – Bronze', value: 'BRONZE' },
          { title: 'Level 2 – Silver', value: 'SILVER' },
          { title: 'Level 3 – Gold', value: 'GOLD' },
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isForSale',
      title: 'Available for Sale',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.name',
      media: 'images.0',
      price: 'price',
    },
    prepare({ title, artist, media, price }) {
      return {
        title,
        subtitle: `${artist || 'No artist'} · €${price}`,
        media,
      }
    },
  },
})
