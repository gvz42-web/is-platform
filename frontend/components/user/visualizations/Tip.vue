<template>
  <vs-tooltip>
    <span>
      <slot></slot>
    </span>
    <template #tooltip>
      <div class="content-tooltip">
        <h4>
          Whats is Vuesax?
        </h4>
        <p>
          Vuesax is a framework of UI components created with Vuejs
        </p>
      </div>
    </template>
  </vs-tooltip>
</template>

<script>
export default {
  name: "Tip"
}
</script>

<style scoped>

</style>
