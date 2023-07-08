export default {
  state: {
    currentMenu: {}, // 左侧选择当前的路由
    tabList: [
      {
        path: '/home',
        name: 'home',
        label: 'Trang chủ',
        icon: 's-platform'
      }
    ] // tabs列表
  },
  mutations: {
    // 根据左侧导航栏设置tabList的值
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    // 关闭tab方法
    closeTab(state, val) {
      const result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    },
    // 刷新页面之后存进来的值
    changeSetTabs(state, val) {
      state.tabList = val
    }

  },
  actions: {}
}
