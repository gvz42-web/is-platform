<template>

  <div class="hidden">
    <vs-sidebar
      v-model="active"
      hover-expand
      open
      reduce
    >
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item v-for="item of items" :id="item.id" :key="item.id" :to="item.route">
        <template #icon>
          <i :class="item.icon" class='bx'></i>
        </template>
        {{ item.name }}
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class='bx bx-bell'></i>

            <template #badge>
              28
            </template>
          </vs-avatar>

          <vs-avatar>
            <img alt=""
                 src=""
            ></vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
    }
  },
  computed: {
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
  }
}
</script>

<style lang="sass">
</style>
