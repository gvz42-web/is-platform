<template>
  <div v-cloak>
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
  async beforeMount() {
    const loading = this.$vs.loading({
      type: 'circles',
      text: 'Загрузка...'
    })
    await this.$store.commit('auth/initialiseStore');
    if (!this.$store.getters["auth/isSignedIn"]) {
      await this.$router.push('/login')
      this.$vs.notification({
        color: 'warning',
        position: 'top-center',
        title: 'Токен истёк',
        text: 'Введите логин и пароль'
      })
    } else {
      const userId = this.$store.getters["auth/getUserId"]
      this.user = await this.$userRepositoryUser.show(userId).catch(err => {
        this.$store.commit('auth/reset');
        this.$router.push('/login')
        console.log(err)
      })
      this.$store.commit('user/initialiseStore', {firstName: this.user.first_name, lastName: this.user.last_name})
      this.tests = await this.$moduleRepositoryUser.showList(this.user.tests)
    }
    loading.close()


  },
  methods: {
    async openTest(id) {
      this.openedTest = await this.$moduleRepositoryUser.show(id, {})
      this.doTest = true
    }
  }
}
</script>
