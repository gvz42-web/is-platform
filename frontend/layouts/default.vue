<template>
  <div v-cloak :class="{hideMenu: isLogin}" class="screen">
    <Menu :active-sidebar="activeSidebar" class="menu"/>
    <Nuxt class="content"/>
  </div>
</template>

<script>
import Menu from '~/components/common/Menu'

export default {
  components: {Menu},
  data() {
    return {
      activeSidebar: false
    }
  },
  computed: {
    isLogin() {
      return this.$route.path.includes('/login')
    }
  }
}
</script>

<style lang="sass">
.menu__toggle
  position: absolute
  left: 10px
  top: 10px

.screen
  width: 100%
  height: 100vh
  display: flex
  overflow-x: hidden
  padding-bottom: 40px

  .content
    width: 100%
    padding: 150px 150px 150px 210px

    @media (max-width: 600px)
      padding: 20px

.hideMenu

  .menu
    display: none

  .content
    padding: 0

</style>
