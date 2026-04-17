import { defineField, defineType } from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
    defineField({
      name: 'filterCategories',
      title: 'Filter Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Material filter options shown above the gallery grid',
    }),
    defineField({
      name: 'certificationFilters',
      title: 'Certification Filter Labels',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'emptyStateText', title: 'No Results Message', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Gallery Page' }) },
})
