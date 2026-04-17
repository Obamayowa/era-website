import { defineField, defineType } from 'sanity'

export const artistPortalPage = defineType({
  name: 'artistPortalPage',
  title: 'Artist Portal Page',
  type: 'document',
  fields: [
    defineField({ name: 'signupHeadline', title: 'Signup — Headline', type: 'string' }),
    defineField({ name: 'signupSubheadline', title: 'Signup — Subheadline', type: 'string' }),
    defineField({
      name: 'signupSteps',
      title: 'Signup Form Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'number' },
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Step Description', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'certificationTiers',
      title: 'Certification Tiers (shown on signup step 3)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Tier Name', type: 'string' },
          { name: 'price', title: 'Price (e.g. Free / €25)', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          { name: 'isRecommended', title: 'Mark as Recommended', type: 'boolean' },
        ],
      }],
    }),
    defineField({ name: 'successHeadline', title: 'Success State Headline', type: 'string' }),
    defineField({ name: 'successMessage', title: 'Success State Message', type: 'text' }),
    defineField({
      name: 'skillLevelOptions',
      title: 'Skill Level Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options shown in the skill level dropdown',
    }),
    defineField({
      name: 'materialOptions',
      title: 'Material Options (multi-select on signup)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Artist Portal Page' }) },
})
