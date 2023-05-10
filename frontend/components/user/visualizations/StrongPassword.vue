<template>
  <div>
    <h2>Введите пароль: </h2>
    <vs-input v-model="password" class="input" placeholder="Пароль"/>

    <div class="info">
      <div class="checkboxes">

        <div class="option">
          <vs-avatar v-if="info.letters" size="30" success>
            <i class="bx bx-check"></i>
          </vs-avatar>
          <vs-avatar v-else danger size="30">
            <i class="bx bx-x"></i>
          </vs-avatar>
          <span>Буквы</span>
        </div>

        <div class="option">
          <vs-avatar v-if="info.lowerCase" size="30" success>
            <i class="bx bx-check"></i>
          </vs-avatar>
          <vs-avatar v-else danger size="30">
            <i class="bx bx-x"></i>
          </vs-avatar>
          <span>Нижний регистр</span>
        </div>

        <div class="option">
          <vs-avatar v-if="info.upperCase" size="30" success>
            <i class="bx bx-check"></i>
          </vs-avatar>
          <vs-avatar v-else danger size="30">
            <i class="bx bx-x"></i>
          </vs-avatar>
          <span>Верхний регистр</span>
        </div>

        <div class="option">
          <vs-avatar v-if="info.numbers" size="30" success>
            <i class="bx bx-check"></i>
          </vs-avatar>
          <vs-avatar v-else danger size="30">
            <i class="bx bx-x"></i>
          </vs-avatar>
          <span>Цифры</span>
        </div>

        <div class="option">
          <vs-avatar v-if="info.symbols" size="30" success>
            <i class="bx bx-check"></i>
          </vs-avatar>
          <vs-avatar v-else danger size="30">
            <i class="bx bx-x"></i>
          </vs-avatar>
          <span>Специальные символы</span>
        </div>
        <div class="option">
          <vs-avatar primary size="30">
            <i class="bx bx-rename"></i>
          </vs-avatar>
          <span>Длина: {{ password.length }} символов</span>
        </div>
      </div>
      <div class="result">
        <span>Количество вариантов пароля: </span>
        <span class="number">{{ count }}</span>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: "StrongPassword",
  components: {},
  data() {
    return {
      password: '',
    }
  },
  computed: {
    info() {
      return {
        numbers: /\d/.test(this.password),
        letters: /[a-zA-Z]/.test(this.password),
        upperCase: /[A-Z]/.test(this.password),
        lowerCase: /[a-z]/.test(this.password),
        symbols: /[$-/:-?{-~!"^_`[\]]/.test(this.password)
      }
    },
    count() {
      return ((this.info.numbers ? 10 : 0) + (this.info.lowerCase ? 26 : 0) + (this.info.upperCase ? 26 : 0) + (this.info.upperCase ? 26 : 0) + (this.info.symbols ? 33 : 0)) ** (this.password ? this.password.length : 1)
    }
  },
  watch: {
    password: {
      handler() {
        for (const item in this.info) {
          if (!item) {
            return false
          }
        }
        this.$emit('complete')
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.info
  margin-top: 20px
  display: flex
  justify-content: space-between

.result
  display: flex
  flex-direction: column
  width: 400px

.number
  font-size: 30px
  color: #0076d1


.option
  display: flex
  align-items: center
  margin-bottom: 10px

  span
    margin-left: 20px
    font-size: 20px

i
  transition: all 0.3s
</style>
