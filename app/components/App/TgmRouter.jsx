
let TgmRouter = {
  categoryLink: (c) => { return `/technique/${c.path}` },
  categoryPath: '/technique/:categoryPath',

  locationPath: '/tgm2/locations/:locationname',
  locationLink: (v) => { return `/tgm2/locations/${v}` },

  tgm2Path: '/tgm2',

  videosShowPath: '/videos/view/:youtubeId',
  videosShowLink: (v) => { return `/videos/view/${v.youtube_id}` },

}

export default TgmRouter
