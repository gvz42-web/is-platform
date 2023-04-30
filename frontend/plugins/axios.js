export default function ({ $axios, store }) {
  $axios.onRequest(async (config) => {
    try {
      const token = await store.getters['auth/getToken']
      $axios.setToken(token, 'Bearer')
    } catch (error) {
      console.log('Could not update token:', error)
    }
    return config
  })
}
