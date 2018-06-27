import store from '@/store'
import {go} from '@/util'
import Mark from '@/pages/mark'

export default {
  path: '/',
  component: Mark,
  beforeEnter (to, from, next) {
    store.dispatch('Mark/GET_LIST').then(go(next), go(next))
  }
}
