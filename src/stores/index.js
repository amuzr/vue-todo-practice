import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import todo from './todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    todo: todo
  }
})
