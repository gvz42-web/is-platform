<template>
  <div class="table">
    <button @click.prevent="modal.createUser = true">Добавить сотрудника</button>
    <select v-model="selectedModule">
      <option v-for="module of modules" :key="module._id" :value="module._id">{{ module.title }}</option>
    </select>
    <button @click.prevent="assignToSelected">Назначить выбранным</button>
    <vue-good-table
      ref="userTable"
      :columns="columns"
      :rows="users"
      :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }">
      <template slot="table-row" slot-scope="props">
          <span v-if="props.column.label == 'Управление'">
            <UserControl :id="props.formattedRow._id"/>
          </span>
        <span v-if="props.column.label == 'Имя'" @click="openUserCard(props.row)">
            {{ props.formattedRow.first_name + ' ' + props.formattedRow.last_name }}
        </span>
        <span v-if="props.column.label == 'Теги'">
            {{ props.formattedRow.user_tags }}
        </span>
      </template>
    </vue-good-table>

    <Modal :opened="modal.deleteUser" :title="'Вы уверены?'" @close="modal.deleteUser = false"/>
    <Modal :opened="modal.createUser" @close="modal.createUser = false">
      <CreateUser @close="modal.createUser = false"/>
    </Modal>
    <Modal v-if="modal.userCard" :opened="modal.userCard" :title="'Сотрудник'" @close="modal.userCard = false">
      <UserCard :user="openedUser"/>
    </Modal>
  </div>
</template>
<script>

import CreateUser from "@/components/admin/user/CreateUser";
import UserControl from "@/components/admin/user/UserControl";
import Modal from "@/components/common/Modal";
import UserCard from "@/components/admin/user/UserCard";

export default {
  name: 'UserTable',
  components: {UserCard, Modal, CreateUser, UserControl},
  props: ['users', 'modules'],
  data() {
    return {
      columns: [{
        label: 'id',
        field: '_id',
        hidden: true
      }, {
        label: 'Имя',
        field: 'first_name'
      },
        {
          label: 'Фамилия',
          field: 'last_name',
          hidden: true
        },
        {
          label: 'Теги',
          field: 'user_tags'
        },
        {
          label: 'Управление',
          field: 'something'
        }],
      openedUser: {},
      isCreateUserOpen: false,
      modal: {
        deleteUser: false,
        createUser: false,
        userCard: false
      },
      selectedModule: '',
    }
  },
  methods: {
    async assignToSelected() {
      const ids = this.$refs.userTable.selectedRows.map(user => user._id)
      const test = {
        test_id: this.selectedModule,
        score: 0,
        time_start: Date.now()
      }
      for (const id of ids) {
        await this.$userRepository.update(id, {$push: {tests: test}})
      }
    },
    openUserCard(user) {
      this.openedUser = user
      this.modal.userCard = true
    }
  }
}
</script>

<style lang="sass">
table
  border-radius: 15px
  overflow: hidden
  background-color: #e7e7e7
  width: 100%
</style>
