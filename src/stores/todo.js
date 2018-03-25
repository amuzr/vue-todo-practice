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

export default {
  state: {
    maxSeqNo:0,
    beforeEditCache:null,
    editedTodo:null,
    todos:[],
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
    LOAD_STORAGE(state, user){
      const storageKey = 'todo_'+user.id
      if(localStorage.getItem(storageKey)) {
        const todos = JSON.parse(localStorage.getItem(storageKey))
        state.maxSeqNo = Math.max(...todos.map(o => o.id))
				state.todos = todos
			}
    },
    UPDATE_STORAGE(state, userId){
      if(state.todos) {
        localStorage.setItem('todo_'+userId,JSON.stringify(state.todos))
      }
    },
    SET_VISIBILITY(state, visibility){
      state.visibility = visibility
    },
    ADD_TODO(state, todo){
			state.todos.push(todo)
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
        state.$store.commit('REMOVE_TODO',todo)
      }
    },
    CANCEL_EDIT(state, todo){
      state.editedTodo = null
			todo.title = state.beforeEditCache
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
    addTodo({state, commit, rootState}, title){
      const userId = rootState.user.socialUser.id
      const todo = {
        id: ++state.maxSeqNo,
        userId: userId,
        title: title,
        completed: false
      }
      commit('ADD_TODO', todo)
      commit('UPDATE_STORAGE',userId)
    },
    removeTodo({commit,rootState}, todo){
      commit('REMOVE_TODO', todo)
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    },
    updateTodo({commit,rootState}, todo){
      commit('UPDATE_TODO', todo)
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    },
    editTodo({commit}, todo){
      commit('EDIT_TODO', todo)
    },
    doneEdit({commit,rootState}, todo){
      commit('DONE_EDIT', todo)
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    },
    cancelEdit({commit}, todo){
      commit('CANCEL_EDIT', todo)
    },
    completeTodo({commit,rootState}, todo){
      commit('COMPLETE_TODO', todo)
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    },
    clearTodo({commit}){
      commit('CLEAR_TODO')
    },
    removeCompleted({commit,rootState}){
      commit('REMOVE_COMPLETED')
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    },
    completeAll({commit,rootState}, check){
      commit('COMPLETE_ALL',check)
      const userId = rootState.user.socialUser.id
      commit('UPDATE_STORAGE',userId)
    }
  }
}
