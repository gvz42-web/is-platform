<template>
  <div>
    <div class="part">
      <div v-if="task.partType === 't'">
        <div v-html="task.data"></div>
      </div>

      <div v-if="task.partType === 's'">
        {{ task.data.text }}
        <div v-for="(option, index) in task.data.options" :key="index">
          <input v-model="currentAnswer" :name="index" :value="index" type="radio">
          <label for="index">{{ option.text }}</label>
        </div>
      </div>

      <div class="control">
        <button :disabled="isButtonDisabled" @click.prevent="submitTask">Далее</button>
      </div>
    </div>

    <Modal :opened="intro" :type="'submit'" title="Тест" @submit="intro = false">{{ module.description.full }}</Modal>
  </div>
</template>

<script>
import Modal from "@/components/common/Modal";

export default {
  name: "Module",
  components: {Modal},

  props: ['module'],
  data() {
    return {
      intro: true,
      moduleInfo: {},
      currentTask: 0,
      currentAnswer: '',
      list: []
    }
  },
  computed: {
    task() {
      console.log(this.module.list)
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
      } else if (this.currentAnswer !== '') {
        return false
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
      console.log(task)
      if (task.partType === "t") {
        this.list.push('t')
      } else {
        this.list.push(this.currentAnswer)
      }
      if (this.currentTask === this.module.list.length - 1) {
        const token = localStorage.getItem('authToken')
        this.$userRepositoryUser.check_test({token, moduleId: this.module._id, result: this.list})
        alert('Вы заершили тест!')
      } else {
        this.currentTask++
      }

      this.currentAnswer = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.part

  .control
    display: flex
    flex-direction: row
    justify-content: flex-end
    margin-top: 60px

    button
</style>
