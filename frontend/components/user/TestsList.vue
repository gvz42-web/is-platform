<template>
  <div class="tests-list">
    <vs-card-group>

      <vs-card v-for="test of tests" :key="test.test_id" class="test">
        <template #title>
          <h3>{{ test.title }}</h3>
        </template>
        <template #img>
          <img :src="test.image ? test.image : require(`~/assets/img/coverPlaceholder.jpg`)"
               alt=""
               class="moduleCover">

        </template>
        <template #text>
          <p>
            {{ test.description.short }}
          </p>
        </template>
        <template #interactions>

          <vs-button v-if="test.status === 'completed'" size="large" success @click="0">
            <span class="span">
              Модуль пройден
            </span>
          </vs-button>

          <vs-button v-if="test.status === 'failed'" danger size="large" @click="0">
            <span class="span">
              Модуль не пройден
            </span>
          </vs-button>

          <vs-button v-if="!test.isFinished" size="large" @click="openTest(test.test_id)">
            <span class="span">
              Пройти
            </span>
          </vs-button>
          <vs-button v-else class="btn-chat" primary shadow size="large">
            <span class="span">
            {{ test.score + '/' + test.max }}
            </span>
          </vs-button>
        </template>
      </vs-card>
    </vs-card-group>
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
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.test
  width: 500px

.moduleCover
  width: 300px
  height: 240px
  object-fit: cover

</style>

