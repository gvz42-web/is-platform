<template>
  <div class="multiple">
    <form>
      <label for="text">Текст вопроса:</label>
      <vs-input v-model="dataQ.text" class="question" placeholder="Текст вопроса"/>
      <span>Варианты ответа:</span>
      <div v-for="(option, index) of dataQ.options" :key="index" class="option">
        <vs-input v-model="option.text" :placeholder="index+1" type="text"/>
      </div>
      <vs-button @click.prevent="dataQ.options.push({text: undefined})">Добавить вариант</vs-button>
    </form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "OrderChoice",
  components: [draggable],
  props: ['edited_question'],
  data() {
    return {
      dataQ: {
        text: undefined,
        options: [
          {
            text: undefined
          }
        ],
      },
    }
  },
  watch: {
    dataQ: {
      handler(val) {
        this.$emit('update', JSON.stringify(this.dataQ))
      },
      deep: true
    }
  },
  mounted() {
    if (this.edited_question) {
      this.dataQ = {
        ...this.dataQ,
        ...JSON.parse(this.edited_question)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
form
  display: flex
  flex-direction: column
  align-items: flex-start

  .question
    width: 100%
    margin: 10px 0

  .option
    display: flex
    flex-direction: row
    align-items: center
    width: 100%
    margin: 6px 0
</style>

