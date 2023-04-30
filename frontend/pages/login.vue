<template>
  <div class="center ">
    <div class="content-inputs">
      <vs-input v-model="email" class="input" placeholder="Email">
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
      </vs-input>

      <vs-input id="password" v-model="password" class="input" placeholder="Пароль" type="password"
                @keydown.enter="login">
        <template #icon>
          <i class='bx bx-lock-open-alt'></i>
        </template>
      </vs-input>
      <vs-button size="large" @click="login">Войти</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: '',
      email: '',
      active: true
    }
  },
  methods: {
    async login() {
      if (this.password.length > 0 && this.email.length > 0) {

        await this.$userRepositoryUser.login({login: this.email, password: this.password}).then(async res => {

          await this.$store.commit("auth/login", {token: res.token, userId: res.userId})
          this.$router.push('/')
        }).catch(err => alert(err.response.data.message))
      } else {
        alert('Введите логин и пароль')
      }

    },
  }
}
</script>

<style lang="sass" scoped>
.input
  margin: 20px 0

.center
  width: 100%
  display: flex
  justify-content: center
  align-items: center

</style>
