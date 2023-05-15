export const state = () => ({
  firstName: '',
  lastName: '',
})

export const getters = {
  getUser(state) {
    return {
      firstName: state.firstName,
      lastName: state.lastName,
    }
  },
}

export const mutations = {
  initialiseStore(state, { firstName, lastName }) {
    Object.assign(state, {
      firstName,
      lastName,
    })
  },
}
