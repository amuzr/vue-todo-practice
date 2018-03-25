<template>
  <div is="sui-container">
    <h1>Welcome, {{greeting}}.</h1>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    greeting() {
      return this.$store.state.user.logged ? this.$store.state.user.socialUser.profile.firstName : 'please login first'
    }
  }
}
</script>
