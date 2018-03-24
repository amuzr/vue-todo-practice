<template>
  <div is="sui-container">
    <h1>todos</h1>
    <TodoApp />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoApp from '@/components/Todo/TodoApp.vue'

export default {
  name: 'home',
  components: {
    TodoApp
  }
}
</script>
