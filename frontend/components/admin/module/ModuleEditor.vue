<template>
  <div class="create-module">
    <form>
      <label for="title">Название: </label>
      <input v-model="module.title" name="title" type="text">
      <label for="short_description">Краткое описание: </label>
      <textarea v-model="module.description.short" name="short_description"></textarea>
      <label for="full_description">Полное описание: </label>
      <textarea v-model="module.description.full" name="full_description"></textarea>
      <label for="admin_description">Пояснения: </label>
      <textarea v-model="module.description.admin" name="admin_description" type="text"></textarea>
      <label for="tags">Теги: </label>
      <input v-model="module.module_tags" name="tags" type="text">


      <AccordionItem v-for="item of module.list" :key="item._id" :n="module.list.indexOf(item) + 1"
                     :type="types[item.partType]" @deletePart="deletePart(item._id)">
        <editor
          v-if="item.partType === 't'"
          v-model="item.data"
          :init="{
        plugins: 'lists link image media preview table code wordcount lists',
        height: '800'
      }"
          api-key="26zfr8f9ktdu0vz5cyz16kumwpsh4iqivwviungkcpua4eqw"
          class="editor"
        />

        <SingleChoice v-if="item.partType === 's'" :edited_question="item.data"
                      @update="(updatedData) => item.data = updatedData"/>
      </AccordionItem>
      <button @click.prevent="addPart">Новое задание</button>
      <select v-model="selectedType">
        <option value="t">Теория</option>
        <option value="s">Вопрос (1 вариант)</option>
        <option value="m">Вопрос (множественный выбор)</option>
      </select>
      <button @click.prevent="createModule">{{ buttonCreateOrUpdate }}</button>
    </form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import AccordionItem from "@/components/common/AccordionItem";
import SingleChoice from "@/components/admin/module/questionTypes/singleChoice";

export default {
  name: "ModuleEditor",
  components: {SingleChoice, AccordionItem, 'editor': Editor},
  props: ['edit_module'],
  data() {
    return {
      module: {
        title: '',
        description: {
          short: '',
          full: '',
          admin: ''
        },
        list: [],
        module_tags: '',
        ...this.edit_module
      },
      types: {
        t: 'Теория',
        s: 'Вопрос (один вариант)',
        m: 'Вопрос (множественный выбор)'
      },
      selectedType: ''
    }
  },
  computed: {
    buttonCreateOrUpdate() {
      if (Object.keys(this.edit_module).length === 0) {
        return 'Создать модуль'
      } else {
        return 'Обновить модуль'
      }
    }
  },
  methods: {
    createModule() {
      this.module.module_tags = ['it', 'was', 'edited']       // this.module.module_tags.split(' ')
      console.log(this.module)
      if (Object.keys(this.edit_module).length !== 0) {
        console.log('create')
        this.$moduleRepository.update(this.module._id, this.module).then(() => {
          this.$nuxt.refresh()
        })
      } else {
        console.log('edit')
        this.$moduleRepository.create(this.module).then(() => {
          this.$nuxt.refresh()
        })
      }
      this.$emit('close')
    },
    addPart() {
      this.module.list.push({partType: this.selectedType, data: ''})
      this.selectedType = ''
    },
    deletePart(id) {
      this.module.list = this.module.list.filter(i => i._id !== id)
    }
  }
}
</script>

<style lang="sass" scoped>
.editor
  display: block
  border: 1px solid red

form
  display: flex
  width: 600px
  flex-direction: column
  align-items: flex-start

  input, textarea
    width: 600px

    margin-bottom: 40px

  textarea
    height: 100px
</style>
