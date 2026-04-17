import { defineField, defineType } from 'sanity'

export const commissionsPage = defineType({
  name: 'commissionsPage',
  title: 'Commissions Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
    defineField({
      name: 'commissionTypes',
      title: 'Commission Types',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'id', title: 'ID (e.g. portrait)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'description', title: 'Short Description', type: 'string' },
          { name: 'priceRange', title: 'Price Range (e.g. €500 – €5,000)', type: 'string' },
          { name: 'timeline', title: 'Timeline (e.g. 4–8 weeks)', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'materialOptions',
      title: 'Material Options (multi-select)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'successHeadline', title: 'Success State Headline', type: 'string' }),
    defineField({ name: 'successMessage', title: 'Success State Message', type: 'text' }),
    defineField({ name: 'ctaLabel', title: 'Submit Button Label', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Commissions Page' }) },
})
