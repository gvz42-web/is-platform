<template>
  <div class="table">
    <button @click.prevent="modal.moduleEditor = true">Создать новый модуль</button>
    <vue-good-table
      ref="userTable"
      :columns="columns"
      :rows="modules">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label == 'Название'">
            <span @click="openModuleCreator(props.row)">{{ props.row.title }}</span>
          </span>
        <span v-if="props.column.label == 'Управление'">
            <ModuleControl :id="props.row._id"/>
          </span>
        <span v-if="props.column.label == 'Описание'">
            {{ props.formattedRow['description.short'] }}
          </span>
        <span v-if="props.column.label == 'Теги'">
            {{ props.formattedRow['module_tags'] }}
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

export default {
  name: "ModuleTable",
  components: {ModuleControl, ModuleEditor, Modal},
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

<style scoped>

</style>
