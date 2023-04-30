<template>
  <div class="table">
    <h1>Модули</h1>
    <vs-button
      color="rgb(59,222,200)"
      gradient
      size="large"
      @click="modal.moduleEditor = true">Создать новый модуль
    </vs-button>
    <vue-good-table
      ref="userTable"
      :columns="columns"
      :rows="modules"
      class="moduleTable">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label == 'Название'">
            <h3 @click="openModuleCreator(props.row)">{{ props.row.title }}</h3>
          </span>
        <span v-if="props.column.label == 'Управление'">
            <ModuleControl :id="props.row._id"/>
          </span>
        <span v-if="props.column.label == 'Описание'">
            {{ props.row.description.admin }}
          </span>
        <span v-if="props.column.label == 'Теги'">
            <Tags :tags="props.row.module_tags"/>
          </span>
      </template>
    </vue-good-table>


    <Modal :opened="modal.deleteModule" :title="'Вы уверены?'" @close="modal.deleteModule = false"/>
    <Modal v-if="modal.moduleEditor" :opened="modal.moduleEditor" :title="'Создание нового модуля'"
           @close="closeModuleCreator">
      <ModuleEditor :edit_module="editModule" @close="closeModuleCreator"/>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/common/Modal";
import ModuleEditor from "@/components/admin/module/ModuleEditor";
import ModuleControl from "@/components/admin/module/ModuleControl";
import Tags from "@/components/admin/Tags";

export default {
  name: "ModuleTable",
  components: {Tags, ModuleControl, ModuleEditor, Modal},
  props: ['modules'],
  data() {
    return {
      columns: [
        {
          label: 'ID',
          field: 'id',
          hidden: true
        },
        {
          label: 'Название',
          field: 'title'
        },
        {
          label: 'Описание',
          field: 'description.short'
        },
        {
          label: 'Теги',
          field: 'module_tags'
        },
        {
          label: 'Управление',
          field: 'something'
        }
      ],
      modal: {
        moduleEditor: false,
        deleteModule: false
      },
      editModule: {}
    }
  },
  methods: {
    openModuleCreator(module) {
      this.editModule = module
      this.modal.moduleEditor = true
    },
    closeModuleCreator() {
      this.editModule = {}
      this.modal.moduleEditor = false
    }
  }
}
</script>

<style lang="sass" scoped>
h3
  text-align: center
  cursor: pointer

  &:hover
    color: #273982

.moduleTable
  margin-bottom: 40px
</style>
