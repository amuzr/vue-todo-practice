<template>
  <div is="sui-container">
    <h1>Welcome, {{isLogin ? this.$store.state.user.socialUser.firstName : 'please login first'}}.</h1>
    <router-link to="/login" v-if="!isLogin" tag="button" class="ui primary basic huge button">Go Login</router-link>
    <router-link to="/todo" v-if="isLogin" tag="button" class="ui primary basic huge button">Go TodoApp</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    isLogin() {
      return this.$store.state.user.logged
    }
  }
}
</script>
