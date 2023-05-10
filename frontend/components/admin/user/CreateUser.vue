<template>
  <div class="create-user">
    <h2>Создание нового пользователя</h2>
    <form>
      <vs-input v-model="user.first_name" class="input" label-placeholder="Имя" type="text"/>
      <vs-input v-model="user.last_name" class="input" label-placeholder="Фамилия" type="text"/>
      <vs-input v-model="user.email" class="input" label-placeholder="Email" type="email"/>
      <label for="tags">Теги: </label>
      <Tags :editable="true" :tags="user.user_tags" @delete="deleteTag" @new="addTag"/>
      <vs-button size="large" @click.prevent="createUser">Создать пользователя</vs-button>
    </form>

    <UploadUsers @upload="createManyUsers"/>
  </div>
</template>

<script>
import UploadUsers from "@/components/admin/user/UploadUsers";
import Tags from "@/components/admin/Tags";
import {generatePassword} from "@/utils/utils";

export default {
  name: 'CreateUser',
  components: {Tags, UploadUsers},
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: generatePassword(6),
        user_tags: []
      }
    }
  },
  methods: {
    createUser() {
      this.$emit('close')
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
  align-items: flex-start
  width: 100%

  .input
    width: 100%

    margin: 15px 0
</style>
