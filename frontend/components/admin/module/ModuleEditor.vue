<template>
  <div class="create-module">
    <form>
      <div class="image-upload">
        <span>Обложка модуля:</span>
        <div :style="{backgroundImage: `url(${ module.image })`}" class="image">
          <label class="upload-background" for="file-upload"><i class='bx bx-images'></i></label>
          <input id="file-upload" class="file-input" type="file" @change="handleFile">
        </div>
      </div>

      <vs-input v-model="module.title" class="input" label-placeholder="Название"/>
      <label for="short_description">Краткое описание: </label>
      <textarea v-model="module.description.short" name="short_description"></textarea>
      <label for="full_description">Полное описание: </label>
      <textarea v-model="module.description.full" name="full_description"></textarea>
      <label for="admin_description">Пояснения: </label>
      <textarea v-model="module.description.admin" name="admin_description" type="text"></textarea>
      <span>Теги: </span>
      <Tags :editable="true" :tags="module.module_tags" @delete="deleteTag" @new="addTag"/>


      <AccordionItem v-for="item of module.list" :key="item._id" :n="module.list.indexOf(item) + 1"
                     :type="types[item.partType]" @deletePart="deletePart(item._id)">
        <editor
          v-if="item.partType === 't'"
          v-model="item.data"
          :init="{
        plugins: 'lists link image media preview table code wordcount lists',
        height: '800',
      }"
          api-key="26zfr8f9ktdu0vz5cyz16kumwpsh4iqivwviungkcpua4eqw"
          class="editor"
        />

        <vizualization v-if="item.partType === 'v'" :edited_question="item.data"
                       @update="(updatedData) => item.data = updatedData"/>

        <SingleChoice v-if="item.partType === 's'" :edited_question="item.data"
                      @update="(updatedData) => item.data = updatedData"/>

        <MultipleChoice v-if="item.partType === 'm'" :edited_question="item.data"
                        @update="(updatedData) => item.data = updatedData"/>

        <OrderChoice v-if="item.partType === 'o'" :edited_question="item.data"
                     @update="(updatedData) => item.data = updatedData"/>
      </AccordionItem>
      <div class="create-part">
        <vs-select v-model="selectedType" placeholder="Выберете тип">
          <vs-option label="Теория" selected value="t">Теория</vs-option>
          <vs-option label="Визуализация" value="v">Визуализация</vs-option>
          <vs-option label="Вопрос (1 вариант)" value="s">Вопрос (1 вариант)</vs-option>
          <vs-option label="Вопрос (множественный выбор)" value="m">Вопрос (множественный выбор)</vs-option>
          <vs-option label="Последовательность" value="o">Последовательность</vs-option>
        </vs-select>
        <vs-button @click.prevent="addPart">Добавить раздел</vs-button>
      </div>

      <div class="score">
        <div class="max">
          <div class="title">Максимальный балл:</div>
          <div>{{ maxScore }}</div>
        </div>
        <div class="minimal">
          <div class="title">Проходной балл</div>
          <vs-input v-model="module.minimalScore" inputmode="numeric" type="number"/>
        </div>

      </div>

      <vs-button color="rgb(59,222,200)"
                 gradient @click="createModule">{{ buttonCreateOrUpdate }}
      </vs-button>
    </form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import AccordionItem from "@/components/common/AccordionItem";
import SingleChoice from "@/components/admin/module/questionTypes/singleChoice";
import Tags from "@/components/admin/Tags";
import MultipleChoice from "@/components/admin/module/questionTypes/multipleChoice";
import OrderChoice from "@/components/admin/module/questionTypes/orderChoice";
import Vizualization from "@/components/admin/module/questionTypes/vizualization";

const {compressImage} = require("@/utils/utils")

export default {
  name: "ModuleEditor",
  components: {Vizualization, OrderChoice, MultipleChoice, Tags, SingleChoice, AccordionItem, 'editor': Editor},
  props: ['edit_module'],
  data() {
    return {
      module: {
        title: '',
        image: '',
        description: {
          short: '',
          full: '',
          admin: ''
        },
        list: [],
        minimalScore: 1,
        module_tags: [],
        ...this.edit_module
      },
      types: {
        t: 'Теория',
        v: 'Визуализация',
        s: 'Вопрос (один вариант)',
        m: 'Вопрос (множественный выбор)',
        o: 'Последовательность',
      },
      selectedType: 't',
    }
  },
  computed: {
    buttonCreateOrUpdate() {
      if (Object.keys(this.edit_module).length === 0) {
        return 'Создать модуль'
      } else {
        return 'Обновить модуль'
      }
    },
    maxScore() {
      let count = 0
      for (const item of this.module.list) {
        if (!['t'].includes(item.partType)) {
          count++
        }
      }
      return count
    }
  },
  methods: {
    createModule() {
      if (Object.keys(this.edit_module).length !== 0) {
        this.$moduleRepository.update(this.module._id, this.module).then(() => {
          this.$nuxt.refresh()
        })
      } else {
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
    },
    addTag(tag) {
      this.module.module_tags.push(tag)
    },
    deleteTag(tag) {
      const index = this.module.module_tags.indexOf(tag);
      if (index > -1) { // only splice array when item is found
        this.module.module_tags.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    async handleFile(event) {
      const reader = new FileReader();
      const compressedFile = await compressImage(event.target.files[0], {
        quality: 0.5,
        type: 'image/jpeg',
      });
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        this.module.image = reader.result
      };
    }
  }
}
</script>

<style lang="sass" scoped>
.image-upload
  margin: 10px auto 10px

  span
    display: block
    margin-bottom: 10px

  &:hover
    .upload-background
      opacity: 1

  .upload-background
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background-color: rgba(21, 21, 21, 0.37)
    opacity: 0
    cursor: pointer
    transition: opacity 0.3s

    .bx
      font-size: 40px
      color: white

.image
  width: 300px
  height: 200px
  background-color: #808080
  overflow: hidden
  background-size: cover
  margin: 0 auto 30px

.file-input
  display: none

.score
  width: 100%
  display: flex
  justify-content: space-between

  .minimal
    text-align: right


.editor
  display: block
  border: 1px solid red

form
  display: flex
  width: 600px
  flex-direction: column
  align-items: flex-start

  input, textarea
    width: 100%
    margin-bottom: 40px

  textarea
    height: 100px

.create-part
  display: flex
  margin-bottom: 30px

.input
  width: 100%

  margin-bottom: 20px

.title
  margin-bottom: 10px
</style>
