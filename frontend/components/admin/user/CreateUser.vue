<template>
  <div class="create-user">
    <h2>Создание нового пользователя</h2>
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
      <Tags :editable="true" :tags="user.user_tags" @delete="deleteTag" @new="addTag"/>
      <button @click.prevent="createUser">Создать пользователя</button>
    </form>

    <UploadUsers @upload="createManyUsers"/>
  </div>
</template>

<script>
import UploadUsers from "@/components/admin/user/UploadUsers";
import Tags from "@/components/admin/Tags";

export default {
  name: 'CreateUser',
  components: {Tags, UploadUsers},
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_tags: []
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
    addTag(tag) {
      this.user.user_tags.push(tag)
    },
    deleteTag(tag) {
      this.user.user_tags = this.user.user_tags.filter(t => t !== tag)
    }
  }
}
</script>

<style lang="sass">
form
  display: flex
  flex-direction: column
</style>
