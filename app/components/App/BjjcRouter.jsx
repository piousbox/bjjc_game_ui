import config from 'config'

let BjjcRouter = {
  rootPath: '/tgm3',

  categoriesPath: '/tgm3/categories',
  categoriesLink: () => { 
    return `/tgm3/categories/technique` 
  },
  categoryPath: '/tgm3/categories/:categoryPath',
  categoryLink: (c) => { 
    return `/tgm3/categories/technique/${c.path}` 
  },

  chapterLink: (c) => { return `/tgm3/chapters/${c}` },
  chapterPath: '/tgm3/chapters/:chaptername',

  locationPath: '/tgm3/locations/:locationname',
  locationLink: (v) => { 
    if ('string' === typeof v) {
      return `/tgm3/locations/${v}`
    } else if ('object' === typeof v) {
      return `/tgm3/locations/${v.location_name}`
    }
  },
  locationBadgePath: '/tgm3/locations/:locationname/badges/:badgename',
  locationBadgeLink: (location, badge) => {
    let lname
    let bname

    if ('object' === typeof location) {
      lname = location.location_name
    } else if ('string' === typeof location) {
      lname = location
    }

    if ('object' === typeof badge) {
      bname = badge.location_name
    } else if ('string' === typeof badge) {
      bname = badge
    }

    return `/tgm3/locations/${lname}/badges/${bname}` 
  },

  videosShowPath: '/videos/view/:youtubeId',
  videosShowLink: (v) => { return `/videos/view/${v.youtube_id}` },

  /**
   * formerly TgmApi
   */
  fbLogin:       `${config.apiUrl}/api/users/fb_sign_in`,
  profile:       `${config.apiUrl}/api/users/profile`,
  updateProfile: `${config.apiUrl}/api/users/profile/update`,
  buyStars:      `${config.apiUrl}/api/buyStars`,
  buyBadge: (badge) => {
    return `${config.apiUrl}/api/badges/${badge.location_name}/buy`
  },

}

export default BjjcRouter
