import { artwork } from './artwork'
import { artist } from './artist'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { settings } from './settings'
import { galleryPage } from './galleryPage'
import { marketplacePage } from './marketplacePage'
import { auctionListing } from './auctionListing'
import { auctionsPage } from './auctionsPage'
import { commissionsPage } from './commissionsPage'
import { institutionPage } from './institutionPage'
import { artistPortalPage } from './artistPortalPage'
import { navigation } from './navigation'

export const schemaTypes = [
  // Pages
  homePage,
  galleryPage,
  marketplacePage,
  auctionsPage,
  commissionsPage,
  institutionPage,
  artistPortalPage,
  aboutPage,
  // Documents
  artwork,
  auctionListing,
  artist,
  // Global
  navigation,
  settings,
]
