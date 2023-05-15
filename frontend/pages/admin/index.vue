<template>
  <div>
    <h1>Пользователи</h1>
    <UserTable :modules="modules" :users="users"/>
  </div>
</template>

<script>
import UserTable from "@/components/admin/user/UserTable";

export default {
  components: {UserTable},
  async asyncData(ctx) {
    return {
      users: await ctx.app.$userRepository.index(),
      modules: await ctx.app.$moduleRepository.index(),
    }
  },
  data() {
    return {
      users: [],
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
