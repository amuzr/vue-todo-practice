<template lang="html">
  <section v-show="todos.length">
    <div class="ui checkbox all-check">
      <input type="checkbox" v-model="allDone">
      <i class="chevron down icon"/>
    </div>
		<div class="ui list todo-list">
      <TodoItem v-for="todo in filteredTodos" :todo="todo" :key="todo.id"/>
    </div>
	</section>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  computed: {
    allDone: {
			get: function () {
				return this.$store.getters.activeTodoSize === 0
			},
			set: function (value) {
				this.$store.dispatch('completeAll', value)
			}
		},
    todos() {
      return this.$store.state.todo.todos
    },
    filteredTodos() {
      return this.$store.getters.filteredTodos
    }
  }
}
</script>

<style lang="scss">
.ui.checkbox.all-check {
  position:absolute;
  display:block;
  margin-top:-54px;
  left:34px;
  font-size:1.4rem;
}
</style>
