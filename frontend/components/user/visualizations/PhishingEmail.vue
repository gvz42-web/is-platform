<template>
  <div>
    <h2>Найдите все признаки фишингового письма</h2>
    <div class="container">
      <div class="signs">
        <vs-alert v-for="(sign, index) in signs" :key="index" class="sign" gradient>
          <template #title>
            {{ sign }}
          </template>
        </vs-alert>
        <div class="count">Найдено признаков {{ signs.length }} из {{ current.signsNumber }}</div>
      </div>
      <div class="letter">
        <div class="header">
          <div class="name">{{ current.senderName }}</div>
          <div class="email" v-html="current.senderEmail"></div>
          <div class="subject">{{ current.subject }}</div>
          <div class="text" v-html="current.text"></div>
          <div v-if="current.attachment" class="attachment" v-html="current.attachment"></div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {emails} from "@/utils/phishing";
import {randomElement} from "@/utils/utils";

export default {
  name: "PhishingEmail",
  // eslint-disable-next-line vue/no-unused-components
  data() {
    return {
      emails,
      current: undefined,
      signs: []
    }
  },
  watch: {
    signs: {
      handler() {
        if (this.signs.length === this.current.signsNumber) {
          this.$emit('complete')
        }
      },
      deep: true
    },
  },
  beforeMount() {
    this.current = randomElement(this.emails)
  },
  mounted() {
    const tips = document.getElementsByClassName("tip")
    for (const tip of tips) {
      tip.addEventListener('click', (event) => {
        const item = event.target.getAttribute('data-text')
        if (!this.signs.includes(item)) {
          this.signs.push(item)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
h2
  margin-bottom: 60px

.container
  display: flex
  flex-direction: row-reverse

.letter
  width: 45%
  background-color: #fff
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3)
  margin: 0 auto
  border-radius: 30px
  padding: 30px
  font-family: "Arial"
  cursor: default

.signs
  width: 45%

.sign
  margin-bottom: 10px

.email, .subject
  margin-bottom: 40px

.name
  font-size: 1.3rem
  font-weight: 600

.text
  white-space: pre-line

.subject
  font-size: 1.2rem
  font-weight: 500

.count
  color: #504f52
  width: 100%
  margin-top: 10px
  text-align: center
</style>
