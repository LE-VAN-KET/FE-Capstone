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
    }
  },
  actions: {
  }
}
