import { defineField, defineType } from 'sanity'

export const auctionListing = defineType({
  name: 'auctionListing',
  title: 'Auction Listing',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Artwork Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'artist', title: 'Artist Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'image', title: 'Artwork Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'material', title: 'Material', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'dimensions', title: 'Dimensions', type: 'string' }),
    defineField({ name: 'startingBid', title: 'Starting Bid (€)', type: 'number' }),
    defineField({ name: 'currentBid', title: 'Current Bid (€)', type: 'number' }),
    defineField({ name: 'reservePrice', title: 'Reserve Price (€)', type: 'number' }),
    defineField({
      name: 'endTime',
      title: 'Auction End Date & Time',
      type: 'datetime',
      description: 'When the auction closes',
    }),
    defineField({ name: 'totalBids', title: 'Total Bids', type: 'number' }),
    defineField({
      name: 'certificationLevel',
      title: 'Certification Level',
      type: 'string',
      options: {
        list: [
          { title: 'Level 1 – Bronze', value: 'BRONZE' },
          { title: 'Level 2 – Silver', value: 'SILVER' },
          { title: 'Level 3 – Gold', value: 'GOLD' },
        ],
      },
    }),
    defineField({ name: 'isLive', title: 'Auction is Live', type: 'boolean', initialValue: true }),
    defineField({ name: 'isFeatured', title: 'Feature at Top of Auctions Page', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', artist: 'artist', bid: 'currentBid', media: 'image' },
    prepare: ({ title, artist, bid, media }) => ({
      title,
      subtitle: `${artist} · Current bid: €${bid?.toLocaleString() || '—'}`,
      media,
    }),
  },
})
