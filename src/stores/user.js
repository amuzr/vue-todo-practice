export default {
  state: {
    logged:false,
    currentProvider:null,
    socialUser:null
  },
  getters: {

  },
  mutations: {
    LOGIN(state, user){
      state.logged = true
      state.currentProvider = user.provider
      state.socialUser = user
    },
    LOGOUT(state){
      state.logged = false
      state.currentProvider = null
      state.socialUser = null
    },
    SIGN_UP(state, user){

    }
  },
  actions: {
    login({commit}, user){
      commit('LOGIN', user)
    },
    logout({commit}){
      commit('LOGOUT')
    }
  }
}
