import Vue from 'vue'
// import parser from 'xml2json'

const BASE_URL = 'https://easy-mock.com/mock/5b1ba254e4e8507ccf4dcd59/vmark'
// const windowHeight = parseInt(window.innerHeight)
// const windowWidth = parseInt(window.innerWidth)
// const sketchpadWidth = windowWidth - 55
// const sketchpadHeight = windowHeight - 85
const emptyImage = {
  name: null,
  url: null,
  xml_url: null,
  xml2json: null,
  width: null,
  height: null,
  w: null,
  h: null,
  image: null,
  scale: 1
}

export default {
  namespaced: true,
  state: {
    data: [],
    total: null,
    xml: null,
    current: {
      index: 0
    }
  },
  getters: {
    isEmpty (state) {
      return state.filelists
    }
  },
  mutations: {
    SET_LIST (state, body) {
      var list = body.data
      state.total = body.total
      list.forEach(item => {
        var empty = JSON.parse(JSON.stringify(emptyImage))
        empty.url = item.url
        empty.xml_url = item.xml_url
        empty.xml2json = JSON.parse(item.xml2json)
        empty.name = item.name
        state.data.push(empty)
      })
    }
  },
  actions: {
    GET_LIST ({commit}) {
      return Vue.http.get(BASE_URL + '/getFiles').then(body => {
        commit('SET_LIST', body.body)
      })
    }
  }

}
