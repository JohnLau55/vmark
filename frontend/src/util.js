import Vue from 'vue'

export function go (next) { return function () { next() } }

export function RouterView () {
  return Vue.extend({
    render (h) {
      return h(Vue.component('router-view'))
    }
  })
}

export class Bus {
  $emit (action) {
    if (!this[action]) {
      return
    }

    var args = [].slice.call(arguments, 1)
    var results = this[action].map(fn => fn.apply(this, args))
    return results.length > 1 ? results : results[0]
  }

  $on (action, fn) {
    if (!this[action]) {
      this[action] = [fn]
    } else {
      this[action].push(fn)
    }

    this.$id = this.$id || 0
    fn.$id = ++this.$id
    return fn.$id
  }

  $off (action, id) {
    if (!this[action]) {
      return
    }

    if (id) {
      this[action] = this[action].filter(fn => fn.$id !== id)
    } else {
      this[action] = null
    }
  }

  $subscribed (action) {
    return this[action] && this[action].length > 0
  }
}

export function handlePromise (promise, action, ctx, ignoreSuccess) {
  return promise.then(() => {
    if (ignoreSuccess) {
      return false
    }
    ctx.$notify.success({
      title: action,
      message: 'Successfully done!'
    })
    return false
  }, err => {
    ctx.$notify.error({
      title: action + ' Error',
      message: err.message
    })
    return true
  })
}
