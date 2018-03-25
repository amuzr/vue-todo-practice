<template>
  <div is="sui-container">
    <h1>Social Login</h1>
    <section class="ui segment login-wrap" v-cloak>
      <SocialLogin :provider="facebook" :appId="facebookAppId" :callback="handleSocialLogin">
        <button class="ui facebook button" slot="button" slot-scope="props">
          <i class="facebook icon"></i>
          Login with Facebook
        </button>
      </SocialLogin>
      <div class="ui divider"></div>
      <SocialLogin :provider="google" :appId="googleAppId" :callback="handleSocialLogin">
        <button class="ui google plus button" slot="button" slot-scope="props">
          <i class="google plus icon"></i>
          Login with Google
        </button>
      </SocialLogin>
    </section>
  </div>
</template>

<script>
import SocialLogin from '@/components/SocialLogin.vue'

export default {
  name: 'login',
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
      if(err) {
        console.error(err)
        return
      }
      if(!user) return;
      this.$store.dispatch('login',user).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss">
.ui.segment.login-wrap {
  width:300px;
  margin:0 auto;

  .social-login-btn>button {
    width:100%;
  }
}
</style>
