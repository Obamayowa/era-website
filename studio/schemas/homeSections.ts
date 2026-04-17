import { defineField, defineType } from 'sanity'

export const homeSections = defineType({
  name: 'homeSections',
  title: 'Homepage — All Sections',
  type: 'document',
  fields: [
    // ── HERO ──────────────────────────────────────────────────
    defineField({ name: 'heroLine1', title: 'Hero — Line 1 (e.g. "From")', type: 'string' }),
    defineField({ name: 'heroHighlightWord', title: 'Hero — Highlighted Word (e.g. "Waste")', type: 'string' }),
    defineField({ name: 'heroLine2', title: 'Hero — Line 2 (e.g. "to Masterpiece")', type: 'string' }),
    defineField({ name: 'heroBadgeText', title: 'Hero — Badge Text (small pill above headline)', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero — Subtext Paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'heroCTA1Label', title: 'Hero — Primary Button Label', type: 'string' }),
    defineField({ name: 'heroCTA1Href', title: 'Hero — Primary Button URL', type: 'string' }),
    defineField({ name: 'heroCTA2Label', title: 'Hero — Secondary Button Label', type: 'string' }),
    defineField({ name: 'heroCTA2Href', title: 'Hero — Secondary Button URL', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero — Background Image', type: 'image', options: { hotspot: true } }),

    // ── MARQUEE STRIP ────────────────────────────────────────
    defineField({
      name: 'marqueeItems',
      title: 'Marquee Strip — Scrolling Items',
      type: 'array',
      description: 'The two rows of scrolling tags (materials, artist names, etc.)',
      of: [{ type: 'string' }],
    }),

    // ── MISSION PILLARS ──────────────────────────────────────
    defineField({ name: 'missionBadge', title: 'Mission — Section Badge (e.g. "Our Mission")', type: 'string' }),
    defineField({ name: 'missionHeadline', title: 'Mission — Headline', type: 'string' }),
    defineField({ name: 'missionSubtext', title: 'Mission — Subtext', type: 'string' }),
    defineField({
      name: 'missionPillars',
      title: 'Mission — Pillar Cards (6 boxes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
      validation: R => R.max(6),
    }),

    // ── PROCESS STRIP ────────────────────────────────────────
    defineField({ name: 'processBadge', title: 'Process — Section Badge', type: 'string' }),
    defineField({ name: 'processHeadline', title: 'Process — Headline', type: 'string' }),
    defineField({ name: 'processSubtext', title: 'Process — Subtext', type: 'string' }),
    defineField({
      name: 'processSteps',
      title: 'Process — Steps (4 steps)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'number' },
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
      validation: R => R.max(4),
    }),

    // ── FEATURED ARTWORKS ────────────────────────────────────
    defineField({ name: 'featuredBadge', title: 'Featured Artworks — Section Badge', type: 'string' }),
    defineField({ name: 'featuredHeadline', title: 'Featured Artworks — Headline', type: 'string' }),
    defineField({ name: 'featuredSubtext', title: 'Featured Artworks — Subtext', type: 'string' }),
    defineField({ name: 'featuredCTALabel', title: 'Featured Artworks — CTA Button Label', type: 'string' }),
    defineField({ name: 'featuredCTAHref', title: 'Featured Artworks — CTA Button URL', type: 'string' }),

    // ── ROADMAP ──────────────────────────────────────────────
    defineField({ name: 'roadmapBadge', title: 'Roadmap — Section Badge', type: 'string' }),
    defineField({ name: 'roadmapHeadline', title: 'Roadmap — Headline', type: 'string' }),
    defineField({ name: 'roadmapSubtext', title: 'Roadmap — Subtext', type: 'string' }),
    defineField({
      name: 'roadmapPhases',
      title: 'Roadmap — Phases',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'phase', title: 'Phase Number', type: 'number' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'subtitle', title: 'Date Range', type: 'string' },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['active', 'upcoming', 'future'] } },
          { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
    }),

    // ── NEWSLETTER ───────────────────────────────────────────
    defineField({ name: 'newsletterBadge', title: 'Newsletter — Section Badge', type: 'string' }),
    defineField({ name: 'newsletterHeadline', title: 'Newsletter — Headline', type: 'string' }),
    defineField({ name: 'newsletterSubtext', title: 'Newsletter — Subtext', type: 'string' }),
    defineField({ name: 'newsletterButtonLabel', title: 'Newsletter — Button Label', type: 'string' }),
    defineField({ name: 'newsletterSuccessHeadline', title: 'Newsletter — Success Headline', type: 'string' }),
    defineField({ name: 'newsletterSuccessText', title: 'Newsletter — Success Message', type: 'string' }),
    defineField({ name: 'newsletterSubscriberLabel', title: 'Newsletter — Subscriber Count Label (e.g. "art lovers already joined")', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage — All Sections' }) },
})
