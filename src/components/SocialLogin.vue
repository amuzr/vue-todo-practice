<template lang="html">
  <div v-bind:id="id" @click="handleLogin">
    <button>Login with {{provider}}</button>
  </div>
</template>

<script>
import sdk from '@/social/sdk'
import SocialUser from '@/social/SocialUser'

export default {
  data: () => ({
    version: '2.8'
  }),
  props:['appId','provider','callback'],
  computed: {
    id: () => 'sl' + Math.floor(Math.random() * 0xFFFF)
  },
  methods: {
    handleSocialLoginInvokeSuccess (res) {
      const { callback, provider } = this;
      console.log(res)  // Uncomment to check response coming from provider in log

      const user = new SocialUser()
      let userProfile
      let token

      switch (provider) {
        case 'google':
          const profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
          const authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)

          userProfile = {
            id: profile.getId(),
            name: profile.getName(),
            firstName: profile.getGivenName(),
            lastName: profile.getFamilyName(),
            email: profile.getEmail(),
            profilePicURL: profile.getImageUrl()
          }
          token = {
            accessToken: authResponse.access_token,
            idToken: authResponse.id_token,
            scope: authResponse.scope,
            expiresIn: authResponse.expires_in,
            firstIssued_at: authResponse.first_issued_at,
            expiresAt: authResponse.expires_at
          }

          break
        case 'facebook':
          userProfile = {
            id: res.id,
            name: res.name,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
            profilePicURL: res.picture.data.url
          }
          token = {
            accessToken: res.authResponse.accessToken,
            expiresAt: res.authResponse.expiresIn
          }
          break
        default:
          throw new Error(`Provider ’${provider}’ isn’t supported.`)
      }

      user.provider = provider
      user.profile = userProfile
      user.token = token

      callback(user, null)
    },

    handleSocialLoginInvokeFailure (err) {
      this.callback(null, err)
    },

    handleLogin (e, obj) {
      const { appId, provider, version } = this
      const handleSuccess = this.handleSocialLoginInvokeSuccess

      if (provider === 'facebook') {
        window.FB.init({
          appId,
          xfbml: true,
          version: `v${version}`
        })
        // Invoke Facebook Login
        window.FB.login((response) => {
          const loginResponse = response

          window.FB.api('/me', { fields: 'email,name,id,first_name,last_name,picture' }, (profileResponse) => {
            Object.assign(profileResponse, loginResponse)

            handleSuccess(profileResponse)
          })
        }, { scope: 'email' })
      }
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      if (this.provider === 'google') {
        sdk.google.load(this.appId, this.id, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure)
      } else if (this.provider === 'facebook') {
        sdk.facebook.load(this.appId)
      }
    })
  }
}
</script>

<style lang="css">
</style>
