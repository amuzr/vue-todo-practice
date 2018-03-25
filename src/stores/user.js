export default {
  state: {
    logged:false,
    currentProvider:null,
    socialUser:{
      id:undefined,
      firstName:undefined,
      lastName:undefined,
      name:undefined
    },
    token:null
  },
  getters: {

  },
  mutations: {
    LOGIN(state, user, commit){
      state.logged = true
      state.currentProvider = user.provider
      state.socialUser = user.profile
      state.token = user.token
      localStorage.setItem('todo_user',JSON.stringify(state))
    },
    LOGOUT(state){
      state.logged = false
      state.currentProvider = null
      state.socialUser = null
      state.token = null
      localStorage.removeItem('todo_user')
    },
    CHECK_LOGIN(state){

    }
  },
  actions: {
    login({commit}, user){
      commit('LOGIN', user)
      commit('LOAD_STORAGE', user.profile)
    },
    logout({commit}){
      commit('LOGOUT')
    },
    checkLogin({state, commit, rootState}){
      if(localStorage.getItem('todo_user')) {
        const todoUser = JSON.parse(localStorage.getItem('todo_user'))
        const now = Date.now()
        if(todoUser.token.expiresAt > now) {
          this.replaceState(Object.assign(rootState, {user:todoUser}))
          commit('LOAD_STORAGE', todoUser.socialUser)
        } else {
          localStorage.removeItem('todo_user')
        }
      }
    }
  }
}
