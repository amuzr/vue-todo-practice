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
    googleAppId:'758370462699-cnl3vhfoc9kg07jclniuumfpd5983vh2.apps.googleusercontent.com',
    facebook:"facebook",
    facebookAppId:"467011703341569"
  }),
  components: {
    SocialLogin
  },
  methods: {
    handleSocialLogin : (user, err) => {
      console.log(user)
      console.log(err)
    }
  }
}
</script>

<style lang="css">

</style>
