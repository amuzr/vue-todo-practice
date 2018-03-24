<template lang="html">
  <header class="header">
    <div class="ui right action input fluid">
      <input type="text" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodoItem" @keyup.enter="addTodo">
      <div class="ui teal button" @click="addTodo">
        <i class="add icon"></i>Add
      </div>
    </div>
	</header>
</template>

<script>
export default {
  data: () => ({
    newTodoItem: ''
  }),
  methods: {
    addTodo() {
      const value = this.newTodoItem && this.newTodoItem.trim()
			if (!value){
        return
      }

      this.$store.dispatch('addTodo',value)
      this.clearTodo()
    },
    clearTodo() {
      this.newTodoItem = ''
    }
  }
}
</script>

<style lang="scss">
.header>.ui.fluid {
  margin-left:56px;
}
</style>
