import { rslError } from '../utils'

const generateUser = (response) => {
  const profile = response.getBasicProfile()
  const authResponse = response.getAuthResponse(true)

  return {
    profile: {
      id: profile.getId(),
      name: profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      profilePicURL: profile.getImageUrl()
    },
    token: {
      accessToken: authResponse.access_token,
      idToken: authResponse.id_token,
      scope: authResponse.scope,
      expiresIn: authResponse.expires_in,
      firstIssued_at: authResponse.first_issued_at,
      expiresAt: authResponse.expires_at
    }
  }
}

const load = (appId, cid, fn, err) => {
  const js = document.createElement('script')

  js.src = 'https://apis.google.com/js/platform.js'
  js.id = 'gapi-client'

  js.onload = () => {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: appId
        })
      }

      window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err)
    })
  }

  if (document.getElementsByTagName('script').length === 0) {
    document.appendChild(js)
  } else {
    document.getElementsByTagName('script')[0].parentNode.appendChild(js)
  }
}

export default {
  generateUser,
  load
}
