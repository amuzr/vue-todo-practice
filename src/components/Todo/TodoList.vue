<template lang="html">
  <section class="ui piled segment" v-show="todos.length">
    <sui-checkbox v-model="allDone" label="Mark all as complete" />
		<div class="ui list todo-list">
      <TodoItem v-for="todo in todos" v-bind:todo="todo" :key="todo.id"/>
    </div>
	</section>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data: () => ({
    allDone:false,
    todos:[{
      title:'tesawefawefawefat',
      completed:false
    },{
      title:'tesawefawefawefat',
      completed:false
    },{
      title:'tesawefawefawefat',
      completed:false
    }],
    filteredTodos:[]
  }),
  methods: {

  }
}
</script>

<style lang="scss">
.todo-list {}
</style>
