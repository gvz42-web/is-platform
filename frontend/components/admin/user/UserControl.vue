<template>
  <div>
    <vs-button danger @click.prevent="deleteUser">Удалить</vs-button>
  </div>
</template>

<script>
export default {
  name: "UserControl",
  props: ['id'],
  methods: {
    deleteUser() {
      this.$userRepository.delete(this.id).then(res => {
        if (res) {
          this.$nuxt.refresh()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
