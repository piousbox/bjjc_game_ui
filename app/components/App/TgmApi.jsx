
import config from 'config'

let TgmApi = {
  fbLogin:       `${config.apiUrl}/api/users/fb_sign_in`,
  profile:       `${config.apiUrl}/api/users/profile`,
  updateProfile: `${config.apiUrl}/api/users/profile/update`,

  buyStars:      `${config.apiUrl}/api/buyStars`,
}

export default TgmApi
