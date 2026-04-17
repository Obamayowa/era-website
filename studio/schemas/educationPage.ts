import { defineField, defineType } from 'sanity'

export const educationPage = defineType({
  name: 'educationPage',
  title: 'Education Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
    defineField({
      name: 'tabs',
      title: 'Section Tabs',
      type: 'array',
      description: 'The 4 tabs: Workshops, Online Courses, School Programs, Residency',
      of: [{
        type: 'object',
        fields: [
          { name: 'id', title: 'ID (e.g. workshops)', type: 'string' },
          { name: 'label', title: 'Tab Label', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'workshops',
      title: 'Workshops',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'level', title: 'Level (e.g. Beginner)', type: 'string' },
          { name: 'format', title: 'Format (e.g. In-Person · 2 Days)', type: 'string' },
          { name: 'price', title: 'Price', type: 'string' },
          { name: 'spots', title: 'Max Spots (e.g. 12 max)', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'onlineCourses',
      title: 'Online Courses',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'duration', title: 'Duration', type: 'string' },
          { name: 'price', title: 'Price', type: 'string' },
          { name: 'level', title: 'Level', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'schoolPrograms',
      title: 'School Programs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'ageRange', title: 'Age Range', type: 'string' },
          { name: 'duration', title: 'Duration', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
    }),
    defineField({
      name: 'residencyHeadline', title: 'Residency Section — Headline', type: 'string',
    }),
    defineField({ name: 'residencyDescription', title: 'Residency — Description', type: 'text', rows: 4 }),
    defineField({ name: 'residencyDuration', title: 'Residency — Duration', type: 'string' }),
    defineField({ name: 'residencyStipend', title: 'Residency — Stipend', type: 'string' }),
    defineField({ name: 'residencyApplicationLabel', title: 'Residency — Apply Button Label', type: 'string' }),
    defineField({ name: 'residencyImage', title: 'Residency — Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'residencyFeatures',
      title: 'Residency — Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Education Page' }) },
})
