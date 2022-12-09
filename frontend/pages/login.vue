<template>
  <div>
    <label for="email">Email: </label>
    <input v-model="email" name="email" type="email">
    <label for="password">Пароль: </label>
    <input v-model="password" name="password" type="password">
    <button @click.prevent="login">Войти</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: '',
      email: '',

    }
  },
  methods: {
    login() {
      if (this.password.length > 0 && this.email.length > 0) {
        console.log(this.password)
        this.$userRepositoryUser.login({login: this.email, password: this.password}).then(res => {

          localStorage.setItem('authToken', res.token)
          this.$router.push('/')
        }).catch(err => alert(err.response.data.message))
      } else {
        alert('Введите логин и пароль')
      }

    }
  }
}
</script>

<style scoped>

</style>
