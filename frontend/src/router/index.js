import Vue from 'vue'
import Router from 'vue-router'
import Mark from './routes/mark'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    Mark
  ]
})

export default router
