import { defineField, defineType } from 'sanity'

export const auctionsPage = defineType({
  name: 'auctionsPage',
  title: 'Auctions Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
    defineField({
      name: 'tickerItems',
      title: 'Live Ticker Strip Messages',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Scrolling messages shown at the top of the auctions page',
    }),
    defineField({ name: 'bidModalTitle', title: 'Bid Modal — Title', type: 'string' }),
    defineField({ name: 'bidModalSubtext', title: 'Bid Modal — Subtext', type: 'string' }),
    defineField({ name: 'urgentLabel', title: 'Urgent Countdown Label', type: 'string', description: 'e.g. "Ending Soon!"' }),
    defineField({ name: 'noAuctionsText', title: 'No Active Auctions Message', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Auctions Page' }) },
})
