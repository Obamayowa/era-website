import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Everything Recycled Arts',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      placeholder: 'e.g. © 2026 Everything Recycled Arts. All rights reserved.',
    }),
    defineField({
      name: 'newsletterHeadline',
      title: 'Newsletter Section — Headline',
      type: 'string',
    }),
    defineField({
      name: 'newsletterSubtext',
      title: 'Newsletter Section — Subtext',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
