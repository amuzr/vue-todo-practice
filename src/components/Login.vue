<template lang="html">
  <div is="sui-container">
    <SocialLogin :provider="facebook" :appId="facebookAppId" :callback="handleSocialLogin">
      <button>Login with Facebook</button>
    </SocialLogin>
    <SocialLogin :provider="google" :appId="googleAppId" :callback="handleSocialLogin">
      <button>Login with Facebook</button>
    </SocialLogin>
  </div>
</template>

<script>
import SocialLogin from './SocialLogin.vue'

export default {
  data: () => ({
    google:"google",
    googleAppId:process.env.VUE_APP_GOOGLE_APP_ID,
    facebook:"facebook",
    facebookAppId:process.env.VUE_APP_FACEBOOK_APP_ID
  }),
  components: {
    SocialLogin
  },
  methods: {
    handleSocialLogin(user, err) {
      this.$store.dispatch('login',user).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css">

</style>
