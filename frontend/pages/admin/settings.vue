<template>
  <div>
    <h1>Настройки</h1>
    <vs-button gradient @click="modal.createAdmin = true">Добавить администратора</vs-button>
    <vue-good-table
      ref="adminsTable"
      :columns="columns"
      :rows="admins">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label == 'Имя'">
            <span>{{ props.row.last_name + ' ' + props.row.first_name }}</span>
          </span>
        <span v-if="props.column.label == 'Уровень'">
          <span>{{ props.row.superUser ? "Администратор" : "Модератор" }}</span>
          </span>
        <span v-if="props.column.label == 'Управление'">
            <vs-button danger>Удалить</vs-button>
          </span>

      </template>
    </vue-good-table>
    <Modal :opened="modal.createAdmin" @close="modal.createAdmin = false">
      <h2>Добавить администратора</h2>
      <vs-input v-model="admin.first_name" class="input" label-placeholder="Имя" type="text"/>
      <vs-input v-model="admin.last_name" class="input" label-placeholder="Фамилия" type="text"/>
      <vs-input v-model="admin.email" autocomplete="off" class="input" label-placeholder="Email" type="email"/>
      <vs-input v-model="admin.password" autocomplete="off" class="input" label-placeholder="Пароль" type="password"/>
      <h3>Уровень</h3>
      <vs-select v-model="admin.superUser" placeholder="Выберете уровень">
        <vs-option label="Администратор" value="1">Администратор</vs-option>
        <vs-option label="Модератор" value="0">Модератор</vs-option>
      </vs-select>
      <vs-button @click="createAdmin">Добавить</vs-button>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/common/Modal"

export default {
  name: "Settings",
  components: {Modal},
  data() {
    return {
      admins: [],
      admin: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        superUser: '',
      },
      modal: {
        createAdmin: false
      },
      columns: [
        {
          label: 'ID',
          field: 'admin_id',
          hidden: true
        },
        {
          label: 'Имя',
          field: 'first_name'
        },
        {
          label: 'Уровень',
          field: 'level'
        },
        {
          label: 'Управление',
          field: 'something'
        }
      ],
    }
  },
  async beforeMount() {
    this.admins = await this.$adminRepositoryControl.index()
  },
  methods: {
    createAdmin() {
      const admin = this.admin
      admin.superUser = admin.superUser === "1"
      this.$adminRepositoryControl.create(admin)
    }
  }
}
</script>

<style lang="sass" scoped>
.input
  margin-bottom: 22px
</style>
