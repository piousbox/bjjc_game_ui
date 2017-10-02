
let TgmRouter = {
  categoryLink: (c) => { return `/categories/${c.path}` },
  categoryPath: '/categories/:categoryPath',

  locationPath: '/tgm2/locations/:locationname',
  locationLink: (v) => { return `/tgm2/locations/${v}` },

  tgm2Path: '/tgm2',

  videosShowPath: '/videos/view/:youtubeId',
  videosShowLink: (v) => { return `/videos/view/${v.youtube_id}` },

}

export default TgmRouter
