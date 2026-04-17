import { defineField, defineType } from 'sanity'

export const corporatePage = defineType({
  name: 'corporatePage',
  title: 'Corporate Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'badgeText', title: 'Badge Text (e.g. "ERA Corporate")', type: 'string' }),
    defineField({
      name: 'services',
      title: 'Services (3 cards)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
    }),
    defineField({
      name: 'callForWasteHeadline',
      title: '"Call for Waste" Section — Headline',
      type: 'string',
    }),
    defineField({
      name: 'callForWasteSteps',
      title: '"Call for Waste" Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'industries',
      title: 'Industries We Serve',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'contactHeadline', title: 'Contact Form — Headline', type: 'string' }),
    defineField({ name: 'contactSubtext', title: 'Contact Form — Subtext', type: 'string' }),
    defineField({ name: 'contactButtonLabel', title: 'Contact Form — Submit Button Label', type: 'string' }),
    defineField({ name: 'contactSuccessHeadline', title: 'Contact Form — Success Headline', type: 'string' }),
    defineField({ name: 'contactSuccessText', title: 'Contact Form — Success Message', type: 'text' }),
  ],
  preview: { prepare: () => ({ title: 'Corporate Page' }) },
})
