<template>
  <div class="item">
    <div class="item__title" @click="opened = !opened">
      Часть {{ n }}: {{ type }}
      <button @click.prevent="$emit('deletePart')"> Удалить</button>
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
  border: 1px solid black
  height: auto

  &__title
    height: 40px
    display: flex
    align-items: center

  &__content
    display: block

    &.hidden
      display: none

</style>
