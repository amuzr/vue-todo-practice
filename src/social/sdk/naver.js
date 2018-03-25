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

const load = (appId, cid, fn) => {
  const js = document.createElement('script')

  js.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
  js.id = 'napi-client'

  js.onload = () => {
    let naverLogin = new naver.LoginWithNaverId({
			clientId: appId,
      callbackUrl: "http://localhost:8080/#/login",
			isPopup: false,
      callbackHandle: false,
			loginButton: {color: "green", type: 3, height: 45}
		})


    naverLogin.getLoginStatus((status) => {
      console.log('status :',status)
			if (status) {
				console.log('naverLogin.user :',naverLogin.user)
				fn(naverLogin.user)
			} else {
        naverLogin.init();
				console.log("callback 처리에 실패하였습니다.")
			}
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
