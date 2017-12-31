import pkg from '../../package'

export const DEBUG = (process.env.NODE_ENV !== 'production')
export const APP_TITLE = pkg.name

export const DO_LOGOUT = 'do logout'

export const FBACCOUNT = 'fbAccount-for-localstorage'

export const ITEMS_GET_SUCCESS = 'ITEMS_GET_SUCCESS'
export const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR'
export const ITEMS_UPDATED = 'ITEMS_UPDATED'

export const SET_API_URL = 'set api url'

export const SET_CHAPTER = 'set chapter'
export const SET_CHAPTERS = 'set chapters'

export const SET_BADGE = 'set badge'

export const SET_INDEX_CATEGORY = 'set index category' // add one more category to the tree of them
export const SET_SHOW_CATEGORY  = 'set show category'  // add the display category, with videos

export const SET_CITIES_INDEX = 'set cities index'
export const CITIES_INDEX_UPDATED = 'cities index updated'

export const SET_CITIES = 'set cities'
export const SET_CITIES_SHOW = 'set cities show'
export const SET_CITY = 'set city'

export const SET_GALLERY = 'set gallery'

export const SET_LOCATION = 'set location'
export const SET_REPORT   = 'set report'

export const SET_SITE_NEWSITEMS = 'set site newsitems'
export const SET_STORY          = 'set story'

export const SET_VIDEO = 'set video'

export const SET_PROFILE = 'set profile'
export const SET_PATH    = 'set path'

/**
 * used in tgm3 right now
 * _vp_ 20171004
 */
export const CONST = {
  categories:   'const-categories-223',
  chapter:      'const-chapter',
  chapters:     'const-chapters',
  chat:         'const-chat',
  location:     'const-location',
  locationShow: 'location-show-const',
  locationMap:  'location-map-const', // same as map
  map:          'location-map-const',
  news:         'const-news',
  quest:        'quest--or-badge-const',
  tasks:        'const-tasks',
  technique:    'const-categories-223', // same as categories
  videos:       'const-videos',
}

/**
 * used in reducers right now
 * _vp_ 20171007
 */
export const SET = {
  category:   'set-category',
  categories: 'set-categories-set-sdga3fx',

  inlineCategories: 'set-inline-categories',
  inlinedCategory: 'set-inlined-category',

  quest:    'set-quest-99',

  location: 'set-location-99',

  tasks:    'set-tasks-99',

  videos:   'set-videos-99',
}
