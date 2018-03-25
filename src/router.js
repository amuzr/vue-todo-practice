import Vue from 'vue'
import Router from 'vue-router'
import store from './stores'

import Home from './views/Home.vue'
import Todo from './views/Todo.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todoApp',
      beforeEnter: (to, from, next) => {
        if (!store.state.user.logged) {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      },
      component: Todo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
