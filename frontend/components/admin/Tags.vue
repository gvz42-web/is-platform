<template>
  <div class="tags">
    <div v-for="tag of tags" :key="tags.indexOf(tag)" class="tag blue">
      {{ tag }}
      <span v-if="editable" class="red" @click="$emit('delete', tag)">X</span>
    </div>
    <vs-input v-if="editable" v-model="newTag" placeholder="Добавить тег..." @keydown.enter.prevent="addTag"/>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: Array,
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newTag: ''
    }
  },
  methods: {
    addTag() {
      this.$emit('new', this.newTag)
      this.newTag = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.tags
  display: flex
  width: 100%
  margin-bottom: 60px
  align-items: center
  flex-wrap: wrap

  .tag
    margin: 3px 6px 3px 0
    border-radius: 20px
    display: flex
    justify-content: center
    align-items: center
    padding: 8px 18px

    span
      margin-left: 20px
      border-radius: 50%
      width: 20px
      height: 20px
      text-align: center
      line-height: 21px
      cursor: pointer
      font-size: 12px

  input
    margin: 0
    border-radius: 20px
    padding: 8px 18px

</style>
