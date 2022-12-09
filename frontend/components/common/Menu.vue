<template>
  <div class="menu">
    <a v-for="item of items" :key="items.indexOf(item)" :href="item.route" class="menu__item">
      <img :src="item.icon" alt="">
      <span>{{ item.name }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'Домашняя страница',
          icon: require('@/assets/img/icons/home.png'),
          route: '/',
          isActive: false,
        },
        {
          name: 'Тесты',
          icon: require('@/assets/img/icons/tests.png'),
          route: '/tests',
          isActive: false,
        },
      ],
    }
  },
}
</script>

<style lang="sass">


.menu
  position: fixed
  top: 0
  bottom: 0
  height: 100vh
  left: 0
  width: $menu-width
  z-index: 1000
  background-color: $primary-color
  transition: width 0.1s linear
  transition-delay: 0.2s

  display: flex
  flex-direction: column
  align-items: center

  &__item
    display: flex
    width: 260px

    img
      width: 40px

    span
      visibility: collapse
      opacity: 0
      transition: opacity 0.2s linear

  &:hover
    width: 300px

    .menu__item
      width: 260px

      span
        visibility: visible
        opacity: 1
</style>
