<template>
  <div>
    <vs-button danger @click="deleteModule">Удалить</vs-button>
  </div>
</template>

<script>
export default {
  name: "ModuleControl",
  props: ['id'],
  methods: {
    deleteModule() {
      this.$moduleRepository.delete(this.id).then(res => {
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
