<template>
  <div class="create-user">
    <span>Создание нового пользователя</span>
    <form>
      <label for="first_name">Имя: </label>
      <input v-model="user.first_name" name="first_name" type="text">
      <label for="last_name">Фамилия: </label>
      <input v-model="user.last_name" name="last_name" type="text">
      <label for="email">Email: </label>
      <input v-model="user.email" name="email" type="email">
      <label for="password">Пароль: </label>
      <input v-model="user.password" name="password" type="text">
      <label for="tags">Теги: </label>
      <input v-model="user.user_tags" name="tags" type="text">
      <button @click.prevent="createUser">Создать пользователя</button>
    </form>

    <UploadUsers @upload="createManyUsers"/>
  </div>
</template>

<script>
import UploadUsers from "@/components/admin/user/UploadUsers";

export default {
  name: 'CreateUser',
  components: {UploadUsers},
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_tags: ''
      }
    }
  },
  methods: {
    createUser() {
      this.$emit('close')
      this.user.user_tags = this.user.user_tags.split(' ')
      this.$userRepository.create(this.user).then(() => {
        this.$nuxt.refresh()
      })
      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_tags: ''
      }
    },
    createManyUsers(users) {
      this.$emit('close')
      this.$userRepository.create(users).then(() => {
        this.$nuxt.refresh()
      })
      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_tags: ''
      }
    },
  }
}
</script>

<style lang="sass">
form
  display: flex
  flex-direction: column
</style>
