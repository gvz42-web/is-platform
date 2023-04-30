<template>
  <div class="item">
    <div class="item__title" @click="opened = !opened">
      Часть {{ n }}: {{ type }}
      <vs-button danger @click.prevent="$emit('deletePart')"> Удалить</vs-button>
    </div>
    <div :class="{ 'hidden' : !opened }" class="item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AccordionItem',
  props: ['n', 'type'],
  data() {
    return {
      opened: false
    }
  },
}
</script>
<style lang="sass" scoped>
.item
  width: 100%
  border-radius: 10px
  margin-bottom: 8px
  padding: 8px 16px
  height: auto

  &__title
    height: 50px
    display: flex
    justify-content: space-between
    align-items: center


  &__content
    display: block
    opacity: 1
    padding: 10px

    &.hidden
      display: none
      opacity: 0
      transition: opacity 0.5s linear

</style>
