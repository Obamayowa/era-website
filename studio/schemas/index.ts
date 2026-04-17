import { artwork } from './artwork'
import { artist } from './artist'
import { homePage } from './homePage'
import { homeSections } from './homeSections'
import { aboutPage } from './aboutPage'
import { settings } from './settings'
import { galleryPage } from './galleryPage'
import { marketplacePage } from './marketplacePage'
import { auctionListing } from './auctionListing'
import { auctionsPage } from './auctionsPage'
import { commissionsPage } from './commissionsPage'
import { institutionPage } from './institutionPage'
import { artistPortalPage } from './artistPortalPage'
import { corporatePage } from './corporatePage'
import { educationPage } from './educationPage'
import { navigation } from './navigation'

export const schemaTypes = [
  homePage, homeSections,
  galleryPage, marketplacePage,
  auctionsPage, commissionsPage,
  institutionPage, corporatePage, educationPage,
  artistPortalPage, aboutPage,
  artwork, auctionListing, artist,
  navigation, settings,
]
