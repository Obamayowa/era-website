import { defineField, defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. Lagos, Nigeria',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'certificationLevel',
      title: 'ERA Certification Level',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'NONE' },
          { title: 'Level 1 – Bronze', value: 'BRONZE' },
          { title: 'Level 2 – Silver', value: 'SILVER' },
          { title: 'Level 3 – Gold', value: 'GOLD' },
        ],
      },
      initialValue: 'NONE',
    }),
    defineField({
      name: 'primaryMaterials',
      title: 'Primary Materials',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Ocean Plastic', 'Metal', 'Textile', 'E-Waste', 'Paper', 'Glass', 'Wood'],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      placeholder: '@handle',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on About Page',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'profileImage',
    },
  },
})
