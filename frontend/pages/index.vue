<template>
  <div>
    <h1 v-if="!doTest">Модули</h1>
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
      doTest: false,
      openedTest: {},
      active: false,
      active2: true,
      active3: false,
    }
  },
  async mounted() {
    await this.$store.commit('auth/initialiseStore');
    if (!this.$store.getters["auth/isSignedIn"]) {
      await this.$router.push('/login')
    } else {
      const userId = this.$store.getters["auth/getUserId"]
      this.user = await this.$userRepositoryUser.show(userId).catch(err => {
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
