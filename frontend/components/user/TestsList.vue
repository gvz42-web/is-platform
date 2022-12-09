<template>
  <div class="tests-list">
    {{ tests }}
    <div v-for="test of tests" :key="test.test_id"
         class="test" @click="openTest(test.test_id)">
      <div class="bg-fade">
      </div>
      <div class="info">
        <div class="description">
          <h2>{{ test.title }}</h2>
          <p>{{ test.description.short }}</p>
        </div>
        <div class="progress">
          <span>{{ test.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tests'],
  methods: {
    openTest(id) {
      this.$emit('openTest', id)
    }
  }
}
</script>

<style lang="sass">
.tests-list
  display: flex
  flex-direction: column
  align-items: center

.test
  width: 1000px
  height: 150px
  border-radius: 25px
  position: relative
  overflow: hidden
  color: #fff
  margin-bottom: 40px
  transition: transform 0.1s linear

  &:hover
    transform: scale(1.1)

  .bg-fade
    background: radial-gradient(circle, rgba(0, 0, 0, 0.3539982643448004) 0%, rgba(0, 0, 0, 1) 100%)
    position: absolute
    width: 100%
    height: 100%

  .info
    position: absolute
    width: 100%
    height: 100%
    padding: 30px 40px
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: row

    span
      font-size: 24px

</style>

