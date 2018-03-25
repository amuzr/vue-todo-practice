import { rslError, timestampFromNow } from '../utils'

const generateUser = (response) => ({
  profile: {
    id: response.id,
    name: response.name,
    firstName: response.first_name,
    lastName: response.last_name,
    email: response.email,
    profilePicURL: response.picture.data.url
  },
  token: {
    accessToken: response.authResponse.accessToken,
    expiresAt: timestampFromNow(response.authResponse.expiresIn)
  }
})

const load = (appId) => {
  const id = 'fb-client'
  const fjs = document.getElementsByTagName('script')[0]
  let js

  if (document.getElementById(id)) {
    return
  }

  js = document.createElement('script')

  js.id = id
  js.src = '//connect.facebook.net/en_US/all.js'

  js.onLoad = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.8'
      })
    }
  }

  fjs.parentNode.insertBefore(js, fjs)
}

export default {
  generateUser,
  load
}
