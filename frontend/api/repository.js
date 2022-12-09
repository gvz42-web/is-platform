const qs = require('qs')

export default ($axios) => (resource) => ({
  index() {
    return $axios.$get(`${resource}`)
  },

  show(id, config) {
    return $axios.$get(`${resource}/${id}`, config)
  },

  login(payload) {
    return $axios.$patch(`${resource}/login`, payload)
  },

  check_test(payload) {
    return $axios.$post(`${resource}/check`, payload)
  },

  async showList(payload) {
    const tests = await $axios.$get(`${resource}/list`, {
      params: {
        ids: payload.map((t) => t.test_id),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    })

    console.log(tests)

    const result = []

    for (const test of tests) {
      const userInfo = payload.filter((t) => t.test_id === test._id)[0]
      result.push({
        score: userInfo.score,
        exercises: userInfo.exercises,
        test_id: userInfo.test_id,
        title: test.title,
        description: test.description,
      })
    }

    return result
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$put(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  },
})
