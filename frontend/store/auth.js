export const state = () => ({
  token: '',
  userId: '',
})

export const getters = {
  getData(state) {
    return {
      token: state.token,
      userId: state.userId,
    }
  },
  getToken(state) {
    return state.token
  },
  getUserId(state) {
    return state.userId
  },
  isSignedIn(state) {
    return state.token && state.userId
  },
}

export const mutations = {
  initialiseStore(state) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      Object.assign(state, {
        token,
        userId,
      })
    }
  },
  login(state, { token, userId }) {
    console.log(state)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    Object.assign(state, {
      token,
      userId,
    })
  },
}

export const actions = {}
