<template lang="html">
  <div class="ui item todo-item" :class="{completed: todo.completed, editing: todo == editedTodo}">
    <div class="ui large icon message content view">
      <i class="close icon destroy" @click="removeTodo(todo)"/>
      <div class="ui checkbox">
        <input type="checkbox" v-model="todo.completed">
        <i class="circle outline icon" :class="{check: todo.completed}"/>
      </div>
      <div class="title" @dblclick="editTodo(todo)">{{todo.title}}</div>
    </div>
    <div class="edit ui large input">
      <input type="text" v-model="todo.title" v-todo-focus="todo == editedTodo"
      @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  computed: {
    editedTodo() {
      return this.$store.state.todo.editedTodo
    }
  },
  methods: {
    editTodo(todo) {
      this.$store.dispatch('editTodo',todo)
    },
    removeTodo(todo) {
      this.$store.dispatch('removeTodo',todo)
    },
    doneEdit(todo) {
      this.$store.dispatch('doneEdit',todo)
    },
    cancelEdit(todo) {
      this.$store.dispatch('cancelEdit',todo)
    }
  },
  directives: {
		'todo-focus': function (el, binding) {
			if (binding.value) {
				el.focus();
			}
		}
	}
}
</script>

<style lang="scss">
.todo-item {
  width:100%;
  text-align:left;

  &.completed .title {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  .content {
    border:0;
    margin-bottom:0;
    width:100%;
    height:100%;

    .title {
      word-break:break-all;
      width:calc(100% - 30px);
    }
  }

  .edit {
    display:none;
    width:100%;

    input {
      width:100%;
      min-height:50px;
    }
  }
  .view {
    display:inline-block;

    .destroy {
      display:none;
    }
  }

  &:hover {
    .destroy{
      display:block;
    }
  }

  &.editing {
    .edit {
      display:inline-block;
    }
    .view {
      display:none !important;
    }
  }
}
</style>
