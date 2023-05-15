export const state = () => ({
  adminToken: '',
  adminId: '',
})

export const getters = {
  getData(state) {
    return {
      adminToken: state.adminToken,
      adminId: state.adminToken,
    }
  },
  getToken(state) {
    return state.adminToken
  },
  getAdminId(state) {
    return state.adminId
  },
  isSignedIn(state) {
    return state.adminToken && state.adminId
  },
}

export const mutations = {
  initialiseStore(state) {
    const adminToken = localStorage.getItem('adminToken')
    const adminId = localStorage.getItem('adminId')
    if (adminToken && adminId) {
      Object.assign(state, {
        adminToken,
        adminId,
      })
    }
  },
  login(state, { adminToken, adminId }) {
    localStorage.setItem('adminToken', adminToken)
    localStorage.setItem('adminId', adminId)
    Object.assign(state, {
      adminToken,
      adminId,
    })
  },
}

export const actions = {}
