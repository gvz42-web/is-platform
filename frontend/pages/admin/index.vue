<template>
  <div>
    Admin panel
    <UserTable :modules="modules" :users="users"/>
  </div>
</template>

<script>
import UserTable from "@/components/admin/user/UserTable";

export default {
  components: {UserTable},
  async asyncData(ctx) {
    return {
      users: await ctx.app.$userRepository.index(),
      modules: await ctx.app.$moduleRepository.index(),
    }
  },
  data() {
    return {
      users: []
    }
  }
}
</script>
