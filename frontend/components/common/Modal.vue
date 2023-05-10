<template>
  <div :class="{ show : opened }" class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal-content">
      <div v-if="title" class="title"> {{ title }}</div>
      <div v-if="text" class="text"> {{ text }}</div>
      <slot></slot>
      <div v-if="type == 'choice'" class="button">
        <vs-button size="large" @click="submit">Да</vs-button>
        <vs-button size="large" @click="closeModal">Нет</vs-button>
      </div>
      <div v-if="type == 'start'" class="start">
        <vs-button class="button" size="large" @click="submit">Начать</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['opened', 'title', 'text', 'type'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="sass" scoped>
.modal
  display: none
  max-height: 100vh

.modal.show
  display: flex
  justify-content: center
  align-items: center
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh

  .bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background-color: rgba(0, 0, 0, 0.5)

    z-index: 1

  .modal-content
    background-color: #fff
    padding: 60px
    border-radius: 30px
    overflow: auto
    max-height: calc(100vh - 100px)
    display: flex
    flex-direction: column
    align-items: center
    z-index: 2
    max-width: 700px

    .button
      margin-top: 40px

    .title
      text-align: center
      font-size: 32px
      font-weight: 600
      margin-bottom: 50px

    &::-webkit-scrollbar
      display: none


    -ms-overflow-style: none
    scrollbar-width: none
</style>
