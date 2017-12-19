
const categoriesIndex = (params) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/categories`
    if (params.slug_0) {
      url = `${url}/${params.slug_0}`
      if (params.slug_1) {
        url = `${url}/${params.slug_1}`
        if (params.slug_2) {
          url = `${url}/${params.slug_2}`
          if (params.slug_3) {
            url = `${url}/${params.slug_3}`
            if (params.slug_4) {
              url = `${url}/${params.slug_4}`
              if (params.slug_5) {
                url = `${url}/${params.slug_5}`
                if (params.slug_6) {
                  url = `${url}/${params.slug_6}`
                }
              }
            }
          }
        }
      }
    }
    // console.log('+++ +++ categoriesIndex() action params:', params, 'url:', url)
    fetch(url).then(r => r.json()).then(_data => {
      console.log('+++ +++ categoriesIndex() action got data:', _data)
      let obj = Object.assign({}, _data, { type: SET_INDEX_CATEGORY })
      dispatch(obj)
    })
  }
}

const videosShowAction = (youtubeId) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/videos/view/${youtubeId}`
    fetch(url).then(r => r.json()).then(_data => {
      console.log("+++ +++ got video data:", _data)
      let obj = Object.assign({}, _data, { type: SET_VIDEO })
      dispatch(obj)
    })
  }
}

const categoriesShow = (variables) => {
  return (dispatch, getState) => {
    let state = getState()
    let url = `${config.apiUrl}/api/categories.json`    
    fetch(url).then(r => r.json()).then(_data => {
      dispatch({
        type: SET_CATEGORIES_INDEX,
        categories: _data,
      })
    })
  }
}
