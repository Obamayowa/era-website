import { defineField, defineType } from 'sanity'

export const institutionPage = defineType({
  name: 'institutionPage',
  title: 'Institution Pages',
  type: 'document',
  fields: [
    // Process page
    defineField({
      name: 'processHeadline', title: 'Process — Headline', type: 'string',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'number' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        ],
      }],
    }),

    // Roadmap
    defineField({ name: 'roadmapHeadline', title: 'Roadmap — Headline', type: 'string' }),
    defineField({
      name: 'roadmapPhases',
      title: 'Roadmap Phases',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'phase', title: 'Phase Number', type: 'number' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'subtitle', title: 'Subtitle / Date Range', type: 'string' },
          { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
          {
            name: 'status', title: 'Status', type: 'string',
            options: { list: ['active', 'upcoming', 'future'] },
          },
        ],
      }],
    }),

    // Certification levels
    defineField({ name: 'certHeadline', title: 'Certification — Headline', type: 'string' }),
    defineField({ name: 'certSubheadline', title: 'Certification — Subheadline', type: 'string' }),
    defineField({
      name: 'certificationLevels',
      title: 'Certification Levels',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'level', title: 'Level Number', type: 'number' },
          { name: 'name', title: 'Name (e.g. Bronze)', type: 'string' },
          { name: 'price', title: 'Price (e.g. Free / €25)', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'features', title: 'Features List', type: 'array', of: [{ type: 'string' }] },
          { name: 'color', title: 'Badge Color (CSS class)', type: 'string' },
        ],
      }],
    }),

    // Divisions
    defineField({ name: 'divisionsHeadline', title: 'Divisions — Headline', type: 'string' }),
    defineField({
      name: 'divisions',
      title: 'ERA Divisions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'name', title: 'Division Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Institution Pages Content' }) },
})
