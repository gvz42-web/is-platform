<template>
  <div>
    <ModuleTable :modules="modules"/>
  </div>
</template>

<script>
import ModuleTable from "@/components/admin/module/ModuleTable";

export default {
  name: "Modules",
  components: {ModuleTable},
  async asyncData(ctx) {
    return {
      modules: await ctx.app.$moduleRepository.index()
    }
  },
  data() {
    return {
      modules: []
    }
  },
  async beforeMount() {
    const loading = this.$vs.loading({
      type: 'circles',
      text: 'Загрузка...'
    })
    await this.$store.commit('authAdmin/initialiseStore');
    if (!this.$store.getters["authAdmin/isSignedIn"]) {
      await this.$router.push('/admin/login')
      this.$vs.notification({
        color: 'warning',
        position: 'top-center',
        title: 'Токен истёк',
        text: 'Введите логин и пароль'
      })
    } else {
      const adminId = this.$store.getters["authAdmin/getAdminId"]
      this.user = await this.$adminRepositoryControl.show(adminId).catch(err => {
        this.$router.push('/login')
        console.log(err)
        this.$vs.notification({
          color: 'danger',
          position: 'top-center',
          title: 'Ошибка',
          text: 'Попробуйте ещё раз'
        })
      })
    }
    loading.close()
  }
}
</script>

<style scoped>

</style>
