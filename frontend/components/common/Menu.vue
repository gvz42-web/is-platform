<template>

  <div class="hidden">
    <vs-sidebar
      v-model="active"
      hover-expand
      open
      reduce
    >
      <template #logo>
      </template>

      <vs-sidebar-item>

        {{ user.firstName + ' ' + user.lastName }}
      </vs-sidebar-item>

      <vs-sidebar-item v-for="item of items" :id="item.id" :key="item.id" :to="item.route">
        <template #icon>
          <i :class="item.icon" class='bx'></i>
        </template>
        {{ item.name }}
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between">
          <!--          <vs-avatar badge-color="danger" badge-position="top-right">-->
          <!--            <i class='bx bx-bell'></i>-->

          <!--            <template #badge>-->
          <!--              28-->
          <!--            </template>-->
          <!--          </vs-avatar>-->
        </vs-row>

      </template>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  props: ["activeSidebar"],
  data() {
    return {
      active: 'modules',
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
    items() {
      if (this.$route.path.includes('/admin')) {
        return [
          {
            name: 'Сотрудники',
            icon: 'bx-male',
            route: '/admin',
            isActive: false,
            id: 'workers'
          },
          {
            name: 'Модули',
            icon: 'bx-copy-alt',
            route: '/admin/modules',
            isActive: false,
            id: 'modules'
          },
          {
            name: 'Управление',
            icon: 'bx-copy-alt',
            route: '/admin/settings',
            isActive: false,
            id: 'control'
          },
        ]
      } else {
        return [
          {
            name: 'Модули',
            icon: 'bx-copy-alt',
            route: '/',
            isActive: false,
            id: 'modules'
          },
        ]
      }
    }
  },
  mounted() {
    this.user = this.$store.getters['user/getUser']
  }
}
</script>

<style lang="sass">

</style>
