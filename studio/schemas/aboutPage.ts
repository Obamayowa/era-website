import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'founderBio',
      title: 'Founder Bio',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'missionPillars',
      title: 'Mission Pillars (3 boxes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'impactNumbers',
      title: 'Impact Numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number (e.g. 120)', type: 'number' },
            { name: 'label', title: 'Label (e.g. Artists supported)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'certificationInfo',
      title: 'Certification Section — Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Content' }
    },
  },
})
