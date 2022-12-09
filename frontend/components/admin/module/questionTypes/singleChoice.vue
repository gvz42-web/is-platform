<template>
  <div class="single">
    <form>
      <label for="text">Текст вопроса:</label>
      <input v-model="dataQ.text" name="text" type="text">
      <span>Варианты ответа:</span>
      <div v-for="option of dataQ.options" :key="dataQ.options.indexOf(option)" class="option">
        <input v-model="option.text" type="text">
        <input v-model="dataQ.correct" :value="dataQ.options.indexOf(option)" type="radio"/>
      </div>

      <button @click.prevent="dataQ.options.push({text: ''})">Добавить вариант</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SingleChoice",
  props: ['edited_question'],
  data() {
    return {
      dataQ: {
        text: ' ',
        options: [
          {
            text: ' '
          }
        ],
        correct: 0
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

  .option
    width: 100%
</style>
