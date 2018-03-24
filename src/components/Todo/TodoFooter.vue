<template lang="html">
  <footer class="ui clearing" v-show="todos.length">
		<h4 class="ui left floated header">
			<strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
		</h4>
    <div class="ui buttons">
      <button class="ui button" :class="{active: visibility == 'all'}" @click="setVisibility('all')">All</button>
      <button class="ui button" :class="{active: visibility == 'active'}" @click="setVisibility('active')">Active</button>
      <button class="ui button" :class="{active: visibility == 'completed'}" @click="setVisibility('completed')">Completed</button>
    </div>
		<button class="ui negative basic button right floated" @click="removeCompleted" v-show="todos.length > remaining">
			Clear completed
		</button>
	</footer>
</template>

<script>
export default {
  methods: {
    removeCompleted() {
      this.$store.dispatch('removeCompleted')
    },
    setVisibility(visibility) {
      this.$store.dispatch('setVisibility',visibility)
    },
    pluralize: (word, count) => word + (count === 1 ? '' : 's')
  },
  computed: {
    visibility() {
      return this.$store.state.visibility
    },
    todos() {
      return this.$store.state.todos
    },
    remaining() {
      return this.$store.getters.activeTodoSize
    }
  }
}
</script>

<style lang="scss">
</style>
