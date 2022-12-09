<template>
  <div>
    <ModuleTable :modules="modules"/>
  </div>
</template>

<script>
import ModuleTable from "@/components/admin/module/ModuleTable";

export default {
  name: "Modules",
  components: {ModuleTable},
  async asyncData(ctx) {
    return {
      modules: await ctx.app.$moduleRepository.index()
    }
  },
  data() {
    return {
      modules: []
    }
  }
}
</script>

<style scoped>

</style>
