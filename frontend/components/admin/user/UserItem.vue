<template>
  <tr class="item">
    <td>{{ user.first_name + ' ' + user.last_name }}</td>
    <td>{{ user.user_tags }}</td>
    <td>
      <button @click.prevent="openModal">Удалить</button>
    </td>
    <Modal :opened="deleteQuestion" @close="deleteQuestion = false">
      <div>Вы уверены?</div>
      <button @click.prevent="deleteUser">Да</button>
      <button @click.prevent="deleteQuestion = false">Нет</button>
    </Modal>
  </tr>
</template>

<script>
import Modal from "@/components/common/Modal";

export default {
  components: {Modal},
  props: ['user'],
  data() {
    return {
      deleteQuestion: false
    }
  },
  methods: {
    deleteUser() {
      this.$userRepository.delete(this.user._id).then(res => {
        if (res) {
          this.$nuxt.refresh()
        }
      })
    },
    openModal() {
      this.deleteQuestion = true
    }


  }
}
</script>

<style lang="sass">
.item
  height: 40px
  background-color: #dcdcdc
</style>
