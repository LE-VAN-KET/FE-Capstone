import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import menu from './menu/index'
import tab from './menu/tab'
import catalog from './catalog/index'
import diploma from './diploma/index'
import phoi from './phoi/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu,
    tab,
    catalog,
    diploma,
    phoi
  }
})
