<template>
  <div class="screen">
    <Menu class="menu"/>
    <Nuxt class="content"/>
  </div>
</template>

<script>
import Menu from '~/components/common/Menu'

export default {
  components: {Menu},
}
</script>

<style lang="sass">
.screen
  width: 100%
  height: 100vh
  display: flex

  .content
    width: 100%
    padding: 100px 100px 100px 160px

</style>
