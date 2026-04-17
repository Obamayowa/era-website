import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation & Footer',
  type: 'document',
  fields: [
    // Header
    defineField({ name: 'logoText', title: 'Logo Text', type: 'string' }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'URL Path (e.g. /gallery)', type: 'string' },
          { name: 'isDropdown', title: 'Has Dropdown?', type: 'boolean' },
          {
            name: 'dropdownItems',
            title: 'Dropdown Items',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'URL Path', type: 'string' },
                { name: 'description', title: 'Short Description', type: 'string' },
              ],
            }],
          },
        ],
      }],
    }),
    defineField({ name: 'ctaLabel', title: 'Header CTA Button Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'Header CTA Button URL', type: 'string' }),

    // Footer
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Link Columns',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', title: 'Column Heading', type: 'string' },
          {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'URL', type: 'string' },
              ],
            }],
          },
        ],
      }],
    }),
    defineField({ name: 'footerCopyright', title: 'Copyright Text', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'Twitter / X URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Navigation & Footer' }) },
})
