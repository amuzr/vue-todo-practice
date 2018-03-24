import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const filters = {
  all: function (todos) {
		return todos
	},
	active: function (todos) {
    return todos.filter((todo) => !todo.completed)
	},
	completed: function (todos) {
		return todos.filter((todo) => todo.completed)
	}
}

export default new Vuex.Store({
  state: {
    beforeEditCache:null,
    editedTodo:null,
    todos:[{
      title:'tesawefawefawefat',
      completed:false
    }],
    visibility:'all'
  },
  getters: {
    filteredTodos(state) {
      return filters[state.visibility](state.todos)
    },
    activeTodoSize(state) {
      return filters.active(state.todos).length
    }
  },
  mutations: {
    SET_VISIBILITY(state, visibility){
      state.visibility = visibility
    },
    ADD_TODO(state, todo){
			state.todos.push({ id: state.todos.length + 1, title: todo, completed: false })
    },
    REMOVE_TODO(state, todo){
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    UPDATE_TODO(state, todo){
      todo.title = todo.title.trim()
			if (!todo.title) {
        this.$store.dispatch('removeTodo',todo)
      }
    },
    EDIT_TODO(state, todo){
      state.beforeEditCache = todo.title
      state.editedTodo = todo
    },
    DONE_EDIT(state, todo){
      if (!state.editedTodo) {
        return
      }
			state.editedTodo = null
      todo.title = todo.title.trim()
			if (!todo.title) {
        state.$store.dispatch('removeTodo',todo)
      }
    },
    CANCEL_EDIT(state, todo){
      state.editedTodo = null;
			todo.title = state.beforeEditCache;
    },
    COMPLETE_TODO(state, todo){
      todo.completed = !todo.completed
    },
    CLEAR_TODO(state){
      state.newTodoItem = ''
    },
    REMOVE_COMPLETED(state){
      state.todos = filters.active(state.todos)
    },
    COMPLETE_ALL(state, check){
      state.todos.forEach((todo) => {
        todo.completed = check
      })
    }
  },
  actions: {
    setVisibility({commit}, visibility){
      commit('SET_VISIBILITY',visibility)
    },
    addTodo({commit}, todo){
      commit('ADD_TODO', todo)
    },
    removeTodo({commit}, todo){
      commit('REMOVE_TODO', todo)
    },
    updateTodo({commit}, todo){
      commit('UPDATE_TODO', todo)
    },
    editTodo({commit}, todo){
      commit('EDIT_TODO', todo)
    },
    doneEdit({commit}, todo){
      commit('DONE_EDIT', todo)
    },
    cancelEdit({commit}, todo){
      commit('CANCEL_EDIT', todo)
    },
    completeTodo({commit}, todo){
      commit('COMPLETE_TODO', todo)
    },
    clearTodo({commit}){
      commit('CLEAR_TODO')
    },
    removeCompleted({commit}){
      commit('REMOVE_COMPLETED')
    },
    completeAll({commit}, check){
      commit('COMPLETE_ALL',check)
    }
  }
})
