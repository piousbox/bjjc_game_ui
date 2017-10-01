
let BjjcRouter = {
  categoryLink: (c) => { return `/technique/${c.path}` },
  categoryPath: '/technique/:categoryPath',

  // galleriesShowPath: '/en/galleries/show/:galleryname',
  // galleriesShowLink: (g) => { return `/en/galleries/show/${g}` },

  videosShowLink: (v) => { return `/videos/view/${v.youtube_id}` },
  videosShowPath: '/videos/view/:youtubeId',

}

export default BjjcRouter
