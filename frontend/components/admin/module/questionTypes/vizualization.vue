<template>
  <div>
    <span class="title">Выберете визуализацию: </span>
    <vs-select v-model="dataQ.option" placeholder="Визуализация...">
      <vs-option label="Стойкость пароля" value="password">Стойкость пароля</vs-option>
      <vs-option label="Определение фишингового письма" value="phishing">Определение фишингового письма</vs-option>
    </vs-select>
  </div>
</template>

<script>
export default {
  name: "Vizualization",
  data() {
    return {
      dataQ: {
        option: ''
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
.title
  margin-bottom: 20px
</style>
