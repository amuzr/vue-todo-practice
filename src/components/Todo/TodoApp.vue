<template lang="html">
  <section v-cloak>
    <TodoHeader />
    <TodoList />
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
  }
}
</script>

<style lang="css">
</style>
