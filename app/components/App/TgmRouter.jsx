
let TgmRouter = {
  cityPath: '/:lang(en|ru|pt|es)/cities/travel-to/:cityname',
  cityLink: (g) => { return `/en/cities/travel-to/${g}` },

  cityEventPath: '/:lang(en|ru|pt|es)/cities/travel-to/:cityname/events/show/:eventname',
  cityEventLink: (g) => { return `/en/cities/travel-to/${g.cityname}/events/show/${g.eventname}` },

  cityGalleriesPath: '/:lang(en|ru|pt|es)/cities/travel-to/:cityname/galleries',
  cityGalleriesLink: (g) => { 
    if ('string' === typeof g) {
      return `/en/cities/travel-to/${g}/galleries`
    } else if ('object' === typeof g) {
      return `/en/cities/travel-to/${g.cityname}/galleries`
    }
  },

  cityVenuePath: '/:lang(en|ru|pt|es)/cities/travel-to/:cityname/venues/show/:venuename',
  cityVenueLink: (g) => { return `/en/cities/travel-to/${g.cityname}/venues/show/${g.venuename}` },

  cityReportsPath: "/:lang(en|ru|pt|es)/cities/travel-to/:cityname/reports",
  cityReportsLink: (g) => { 
    if ('string' === typeof g) {
      return `/en/cities/travel-to/${g}/reports`
    } else if ('object' === typeof g) {
      return `/en/cities/travel-to/${g.cityname}/reports`
    }
  },

  cityWrapperPath: "/:lang(en|ru|pt|es)/cities/travel-to",

  galleriesPath: '/:lang(en|ru|pt|es)/galleries',
  galleriesLink: '/en/galleries',
  galleryPath: '/:lang(en|ru|pt|es)/galleries/show/:galleryname',
  galleryLink: (g) => { 
    if (typeof g === 'string') {
      return `/en/galleries/show/${g}`
    } else if (typeof g === 'object') {
      return `/en/galleries/show/${g.galleryname}`
    }
  },
  galleryPhotoPath: '/:lang(en|ru|pt|es)/galleries/show/:galleryname/:photoIdx',
  galleryPhotoLink: (g, i) => {
    if ('string' === typeof g) {
      return `/en/galleries/show/${g}/${i||0}`
    } else if ('object' === typeof g) {
      return `/en/galleries/show/${g.galleryname}/${g.photoIdx||0}`
    }
  },

  reportPath: '/:lang(en|ru|pt|es)/reports/show/:reportname',
  reportLink: (g) => { 
    if (typeof g === 'string') {
      return `/en/reports/show/${g}`
    } else if (typeof g === 'object') {
      let lang = g.lang ? g.lang : 'en'
      return `/${lang}/reports/show/${g.reportname}`
    }
  },
  
  sitePath: '/:lang(en|ru|es|pt)/sites/show',
  siteLink: (g) => {
    if (typeof g === 'string') {
      return `/${g}/sites/show`
    } else if (typeof g === 'object') {
      return `/${g.lang}/sites/show`
    }
  },
           
  tagPath: '',
  tagLink: (g) => {
    if (typeof g === 'string') {
      return `/en/tags/show/${g}`
    } else if (typeof g === 'object') {
      let lang = g.lang ? g.lang : 'en'
      return `/${lang}/tags/show/${g.tagname}`
    }
  },
  tgm2Path: 'tgm2',

  venuePath: '/:lang(en|ru|pt|es)/venues/show/:venuename',
  venueLink: (g) => { return `/en/venues/show/${g}` },

  videoPath: '/:lang(en|ru|pt|es)/videos/show/:youtube_id',
  videoLink: (g) => { return `/en/videos/show/${g}` },

}

export default TgmRouter
