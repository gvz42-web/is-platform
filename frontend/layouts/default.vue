<template>
  <div :class="{hideMenu: isLogin}" class="screen">
    <Menu class="menu"/>
    <Nuxt class="content"/>
  </div>
</template>

<script>
import Menu from '~/components/common/Menu'

export default {
  components: {Menu},
  computed: {
    isLogin() {
      return this.$route.path.includes('/login')
    }
  }
}
</script>

<style lang="sass">
.screen
  width: 100%
  height: 100vh
  display: flex
  overflow-x: hidden

  .content
    width: 100%
    padding: 150px 150px 150px 210px

.hideMenu

  .menu
    display: none

  .content
    padding: 0

</style>
