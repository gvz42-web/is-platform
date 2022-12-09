<template>
  <div>
    <Module v-if="doTest" :module="openedTest"/>
    <TestsList v-else :tests="tests" @openTest="openTest"/>
  </div>
</template>

<script>
import TestsList from "~/components/user/TestsList";
import Module from "~/components/user/Module"

export default {
  components: {TestsList, Module},
  data() {
    return {
      user: {},
      tests: [],
      me: '638fcc183c9aab5ca1a7cb29',
      credentials: {
        login: 'bubla@bar.ru',
        password: '123456710',
      },
      doTest: false,
      openedTest: {}
    }
  },
  async mounted() {

    const token = localStorage.getItem("authToken")
    if (!token) {
      await this.$router.push('/login')
    } else {
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken")
        }
      }
      this.user = await this.$userRepositoryUser.show('638fcc183c9aab5ca1a7cb29', yourConfig).catch(err => {
        console.log(err)
        this.$router.push('/login')
      })
      this.tests = await this.$moduleRepositoryUser.showList(this.user.tests)
    }

  },
  methods: {
    async openTest(id) {
      this.openedTest = await this.$moduleRepositoryUser.show(id, {})
      this.doTest = true
    }
  }
}
</script>
