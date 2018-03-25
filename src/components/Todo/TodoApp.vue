<template lang="html">
  <section class="ui piled segment" v-cloak>
    <TodoHeader />
    <div class="ui divider"></div>
    <TodoList />
    <div class="ui divider"></div>
    <TodoFooter />
  </section>
</template>

<script>
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

export default {
  components:{
    TodoHeader,
    TodoList,
    TodoFooter
  },
  beforeUpdate() {
    if(!this.$store.state.user.logged) {
      this.$router.go('/')
    }
  }
}
</script>

<style lang="css">
</style>
