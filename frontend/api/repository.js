const qs = require('qs')

export default ($axios) => (resource) => ({
  index() {
    return $axios.$get(`${resource}`)
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  delete_test(id, testId) {
    return $axios.$post(`${resource}/${id}/deletetest`, testId)
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

    const result = []

    for (const test of tests) {
      const userInfo = payload.filter((t) => t.test_id === test._id)[0]
      result.push({
        score: userInfo.score,
        image: test.image,
        exercises: userInfo.exercises,
        test_id: userInfo.test_id,
        title: test.title,
        description: test.description,
        max: test.max,
        status: userInfo.status,
        isFinished: !!userInfo.time_end,
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
