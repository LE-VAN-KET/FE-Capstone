export default {
  namespaced: true,
  state: {
    loginuser: {
      accessToken: '',
      donviSymbol: '',
      userId: '',
      refreshToken: '',
      role: ''
    }
  },
  getters: {

  },
  mutations: {
    save_login(state, user) {
      state.loginuser = { ...state.loginuser, ...user }
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('access', user.role)
      localStorage.setItem('uid', user.userId)
    }
  },
  actions: {
  }
}
