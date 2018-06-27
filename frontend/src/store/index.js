import Vue from 'vue'
import Vuex from 'vuex'
import Mark from './modules/mark'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Mark
  }
})
