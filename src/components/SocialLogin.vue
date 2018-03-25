<template lang="html">
  <div class="social-login-btn" v-bind:id="id" @click="handleLogin">
    <slot name="button"/>
  </div>
</template>

<script>
import sdk from '@/social/sdk'
import SocialUser from '@/domain/SocialUser'

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
      const { callback, provider } = this
      console.log(res)  // Uncomment to check response coming from provider in log
      const user = new SocialUser(provider)
      const socialUserData = sdk[this.provider].generateUser(res)

      user.profile = socialUserData.profile
      user.token = socialUserData.token
      callback(user, null)
    },

    handleSocialLoginInvokeFailure (err) {
      this.callback(null, err)
    },

    handleLogin () {
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
      sdk[this.provider].load(this.appId, this.id, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure)
    })
  }
}
</script>

<style lang="css">
</style>
