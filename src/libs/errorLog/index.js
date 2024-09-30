import Vue from 'vue'
import { typeString, typeArray } from 'abbott-methods/import'
import store from '@/store'
import { errorLog as needErrorLog } from '@/set/site'

const checkNeed = () => {
  const env = process.env.NODE_ENV
  if (typeString(needErrorLog)) {
    return env === needErrorLog
  }
  if (typeArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = (err, vm, info, a) => {
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', { err, vm, info, url: window.location.href }).then()
    })
  }
}
