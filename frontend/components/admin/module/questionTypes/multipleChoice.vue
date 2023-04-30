<template>
  <div class="multiple">
    <form>
      <label for="text">Текст вопроса:</label>
      <vs-input v-model="dataQ.text" class="question" name="text" placeholder="Текст вопроса"/>
      <span>Варианты ответа:</span>
      <div v-for="(option, index) of dataQ.options" :key="index" class="option">

        <vs-checkbox v-model="dataQ.correct" :val="dataQ.options.indexOf(option)">
          <vs-input v-model="option.text" :placeholder="`Вариант ответа ${index + 1}`"/>
        </vs-checkbox>
      </div>

      <vs-button @click.prevent="dataQ.options.push({text: undefined})">Добавить вариант</vs-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "MultipleChoice",
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
        correct: []
      },
    }
  },
  watch: {
    dataQ: {
      handler() {
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
</style>
