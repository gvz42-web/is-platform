<template>
  <div>
    <span>{{ user.first_name }}</span>
    <span>{{ user.last_name }}</span>
    <span>{{ user.email }}</span>


    <vue-good-table
      ref="testsTable"
      :columns="columns"
      :rows="tests">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label == 'Название'">
            <span>{{ props.row.title }}</span>
          </span>
        <span v-if="props.column.label == 'Управление'">
            Управление
          </span>
        <span v-if="props.column.label == 'Результат'">
            {{ props.formattedRow['score'] }}
          </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ['user'],
  data() {
    return {
      tests: [],
      columns: [
        {
          label: 'ID',
          field: 'test_id',
          hidden: true
        },
        {
          label: 'Название',
          field: 'title'
        },
        {
          label: 'Результат',
          field: 'score'
        },
        {
          label: 'Управление',
          field: 'something'
        }
      ],
    }
  },
  async created() {
    const tests = await this.$moduleRepository.showList(this.user.tests)
    this.tests = tests

  },
  methods: {
    async getTest(id) {
      const test = await this.$userRepository.show(id)
      return test
    }
  }
}
</script>

<style scoped>

</style>
