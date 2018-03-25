<template>
  <div is="sui-container">
    <h1>todos</h1>
    <TodoApp />
  </div>
</template>

<script>
import TodoApp from '@/components/Todo/TodoApp.vue'

export default {
  name: 'todoApp',
  components: {
    TodoApp
  }
}
</script>
