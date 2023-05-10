<template>
  <div>
    <div class="part">
      <div v-if="task.partType === 't'">
        <div v-html="task.data"></div>
      </div>

      <div v-if="task.partType === 'v'">
        <StrongPassword v-if="task.data.option === 'password'" @complete="visualizationCompleted = true"/>
        <PhishingEmail v-if="task.data.option === 'phishing'" @complete="visualizationCompleted = true"/>
      </div>

      <div v-if="task.partType === 's'" class="choose">
        <h2>{{ task.data.text }}</h2>
        <div v-for="(option, index) in task.data.options" :key="index" class="option">
          <vs-radio v-model="currentAnswer" :val="index">{{ option.text }}</vs-radio>
        </div>
      </div>

      <div v-if="task.partType === 'm'">
        <h2>{{ task.data.text }}</h2>
        <div v-for="(option, index) in task.data.options" :key="index">
          <vs-checkbox v-model="currentAnswers" :val="index">{{ option.text }}</vs-checkbox>
        </div>
      </div>

      <div v-if="task.partType === 'o'">

        <h2>{{ task.data.text }}</h2>


        <div class="order">
          <draggable :list="shuffled" class="list-group" group="people" @change="log">
            <vs-alert v-for="(element, index) in shuffled"
                      :key="index"
                      class="list-group-item"
                      gradient
            >
              <template #title>
                {{ element.text }}
              </template>

            </vs-alert>
          </draggable>
        </div>
      </div>

      <div class="control">
        <vs-button :disabled="isButtonDisabled" size="large" @click="submitTask">Далее</vs-button>
      </div>
    </div>

    <Modal :opened="intro" :title="module.title" :type="'start'" @submit="intro = false">{{
        module.description.full
      }}
    </Modal>

  </div>
</template>

<script>
import Modal from "@/components/common/Modal";
import StrongPassword from "@/components/user/visualizations/StrongPassword";
import PhishingEmail from "@/components/user/visualizations/PhishingEmail";

export default {
  name: "Module",
  components: {PhishingEmail, Modal, StrongPassword},

  props: ['module'],
  data() {
    return {
      intro: true,
      moduleInfo: {},
      currentTask: 0,
      currentAnswer: 0,
      currentAnswers: [],
      order: [],
      shuffled: [],
      list: [],
      visualizationCompleted: false
    }
  },
  computed: {
    task() {
      const task = this.module.list[this.currentTask]
      if (task.partType === 't') {
        return task
      } else {
        return {
          partType: task.partType,
          data: JSON.parse(task.data)
        }
      }
    },
    isButtonDisabled() {
      if (this.module.list[this.currentTask].partType === 't') {
        return false
      } else if (this.module.list[this.currentTask].partType === 's') {
        return false
      } else if (this.currentAnswers.length > 0) {
        return false
      } else if (this.module.list[this.currentTask].partType === 'o') {
        return false
      } else if (this.module.list[this.currentTask].partType === 'v') {
        if (this.visualizationCompleted) {
          return false
        }
      }
      return true
    }
  },
  mounted() {
    this.moduleInfo = '' // TODO: get module info, then tasks one by one
  },
  methods: {
    submitTask() {
      const task = this.module.list[this.currentTask]
      if (task.partType === "t") {
        this.list.push('t')
      } else if (task.partType === "s") {
        this.list.push(this.currentAnswer)
      } else if (task.partType === "m") {
        this.list.push(this.currentAnswers)
      } else if (task.partType === "o") {
        this.list.push(this.shuffled)
      }
      if (this.currentTask === this.module.list.length - 1) {
        this.$userRepositoryUser.check_test({moduleId: this.module._id, result: this.list})
        window.location.reload()
      } else {
        this.currentTask++
        if (this.module.list[this.currentTask].partType === 'o') {
          this.shuffled = this.shuffleArray(this.task.data.options)
        }
      }

      this.currentAnswer = 0
      this.currentAnswers = []
      this.visualizationCompleted = false
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    }
  },

}
</script>

<style lang="sass" scoped>
.part

  .choose
    display: flex
    flex-direction: column
    align-items: flex-start

    .option
      margin: 6px 0

  .control
    display: flex
    flex-direction: row
    justify-content: flex-end
    margin-top: 60px

.order
  display: flex
  padding: 40px
  border-radius: 20px

.order
  display: flex
  flex-direction: column
  padding: 40px


  .list-group-item
    margin: 10px 0

</style>
