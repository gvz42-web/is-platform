<template>
  <div class="table">
    <div class="admin-control">
      <vs-button color="rgb(59,222,200)"
                 gradient
                 size="large" @click.prevent="modal.createUser = true">Добавить сотрудника
      </vs-button>
      <div class="assign-module">
        <vs-select v-model="selectedModule" placeholder="Модуль">
          <vs-option v-for="(module, index) of modules" :key="index" :label="module.title" :value="module._id">
            {{ module.title }}
          </vs-option>
        </vs-select>
        <vs-button size="large" @click.prevent="assignToSelected">Назначить выбранным</vs-button>
      </div>
    </div>

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
        }"
      class="tableUsers">
      <template slot="table-row" slot-scope="props">
          <span v-if="props.column.label == 'Управление'">
            <UserControl :id="props.formattedRow._id"/>
          </span>
        <span v-if="props.column.label == 'Имя'" class="user" @click="openUserCard(props.row)">
            {{ props.formattedRow.first_name + ' ' + props.formattedRow.last_name }}
        </span>
        <span v-if="props.column.label == 'Теги'">
            <Tags :tags="props.row.user_tags"/>
        </span>
      </template>
    </vue-good-table>

    <Modal :opened="modal.deleteUser" :title="'Вы уверены?'" @close="modal.deleteUser = false"/>
    <Modal :opened="modal.createUser" @close="modal.createUser = false">
      <CreateUser @close="modal.createUser = false"/>
    </Modal>
    <Modal v-if="modal.userCard" :opened="modal.userCard" :title="'Сотрудник'" @close="modal.userCard = false">
      <UserCard :user="openedUser" class="user-card"/>
      <div class="assign-module inModal">
        <vs-select v-model="selectedModule" placeholder="Модуль">
          <vs-option v-for="module of modules" :key="module._id" :label="module.title" :value="module._id">
            {{ module.title }}
          </vs-option>
        </vs-select>
        <vs-button @click.prevent="assignToOpened">Назначить</vs-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import CreateUser from "@/components/admin/user/CreateUser";
import UserControl from "@/components/admin/user/UserControl";
import Modal from "@/components/common/Modal";
import UserCard from "@/components/admin/user/UserCard";
import Tags from "@/components/admin/Tags";

export default {
  name: 'UserTable',
  components: {Tags, UserCard, Modal, CreateUser, UserControl},
  props: ['users', 'modules'],
  data() {
    return {
      selectedTags: [],
      optionList: [],
      columns: [{
        label: 'id',
        field: '_id',
        hidden: true
      }, {
        label: 'Имя',
        field: 'first_name',
        filterOptions: {
          enabled: true, // enable filter for this column
          placeholder: 'Введите имя...', // placeholder for filter input
        },
      },

        {
          label: 'Фамилия',
          field: 'last_name',
          hidden: true
        },
        {
          label: 'Теги',
          field: 'user_tags',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Введите теги...', // placeholder for filter input
            filterDropdownItems: this.optionList, // dropdown (with selected values) instead of text input
          },
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
  mounted() {
    this.selectedModule = this.modules[0]._id
    for (const u of this.users) {
      for (const tag of u.user_tags) {
        if (!this.optionList.includes(tag)) {
          this.optionList.push(tag)
        }
      }
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
      this.$nuxt.refresh()
    },
    async assignToOpened() {
      const test = {
        test_id: this.selectedModule,
        score: 0,
        time_start: Date.now(),
        status: 'notCompleted'
      }
      await this.$userRepository.update(this.openedUser._id, {$push: {tests: test}})
      this.$nuxt.refresh()
    },
    openUserCard(user) {
      this.openedUser = user
      this.modal.userCard = true
    },
  }
}
</script>

<style lang="sass">
.admin-control
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center

  .assign-module
    display: flex
    align-items: center

    .inModal
      width: 100%
      flex-direction: row

table
  border-radius: 15px
  overflow: hidden
  background-color: #e7e7e7
  width: 100%

.tableUsers
  margin-bottom: 40px

.user-card
  margin-bottom: 60px

.user:hover
  cursor: pointer
  color: #1a242f
</style>
