<template>
  <div class="question">
    <SingleChoice v-if="type === 's'" :edited_question="JSON.stringify(edited_question)" @update="edi"/>
    <div v-else>
      No code yet
    </div>
  </div>
</template>

<script>
import SingleChoice from "@/components/admin/module/questionTypes/singleChoice";

export default {
  name: "QuestionPart",
  components: {SingleChoice},
  props: ['type', 'edited_question'],
  methods: {
    update(dataQ) {
      this.$emit('updateQuestion', dataQ)
    }
  }
}
</script>

<style scoped>

</style>
