import { defineField, defineType } from 'sanity'

export const marketplacePage = defineType({
  name: 'marketplacePage',
  title: 'Marketplace Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
    defineField({
      name: 'trustStrip',
      title: 'Trust Strip Items (the row of badges under the header)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'filters',
      title: 'Filter Sidebar — Material Options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'cartDrawerTitle', title: 'Cart Drawer Title', type: 'string' }),
    defineField({ name: 'cartEmptyText', title: 'Empty Cart Message', type: 'string' }),
    defineField({ name: 'checkoutButtonLabel', title: 'Checkout Button Label', type: 'string' }),
    defineField({
      name: 'shippingInfo',
      title: 'Shipping Info Text',
      type: 'string',
      description: 'Text shown below checkout button e.g. "Free insured shipping worldwide"',
    }),
  ],
  preview: { prepare: () => ({ title: 'Marketplace Page' }) },
})
