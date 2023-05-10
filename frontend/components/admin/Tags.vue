<template>
  <div class="tags">
    <vs-button v-for="tag of tags" :key="tags.indexOf(tag)" size="large">
      {{ tag }}
      <span v-if="editable" class="delete" @click="$emit('delete', tag)"><i class="bx bx-x"></i></span>
    </vs-button>
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
    border-radius: 12px
    display: flex
    justify-content: center
    align-items: center
    padding: 8px 18px
    background-color: #2157cb
    color: white


.delete
  display: block
  margin-left: 20px
  border-radius: 50%
  width: 21px
  height: 21px
  text-align: center
  line-height: 26px
  cursor: pointer
  font-size: 20px
  background-color: #ffffff
  color: #c54444
  transition: transform 0.2s

  &:hover
    transform: scale(1.1)
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25)

  input
    margin: 0
    border-radius: 20px
    padding: 8px 18px

</style>
