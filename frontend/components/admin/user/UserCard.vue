<template>
  <div>
    <h2>{{ user.first_name + ' ' + user.last_name }}</h2>
    <h3>{{ user.email }}</h3>
    <div v-if="showPassword" class="placeholder blue" @click="showPassword = false">{{ user.password }}</div>
    <div v-else class="placeholder" @click="showPassword = true"> Показать пароль</div>
    <Tags :editable="true" :tags="tags" @delete="deleteTag" @new="addTag"/>


    <vue-good-table
      ref="testsTable"
      :columns="columns"
      :rows="tests">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.label == 'Название'">
            <span>{{ props.row.title }}</span>
          </span>
        <span v-if="props.column.label == 'Управление'">
            <vs-button danger @click.prevent="deleteTest(props.row.test_id)">Удалить</vs-button>
          </span>
        <span v-if="props.column.label == 'Результат'">

          <vs-button v-if="props.row.status === 'completed'" success @click="0">
            <span class="span">
              Модуль пройден {{ props.formattedRow['score'] + '/' + props.row['max'] }}
            </span>
          </vs-button>

          <vs-button v-if="props.row.status === 'failed'" danger @click="0">
            <span class="span">
              Модуль не пройден {{ props.formattedRow['score'] + '/' + props.row['max'] }}
            </span>
          </vs-button>

          <vs-button v-if="props.row.status === 'notCompleted'" warn @click="0">
            <span class="span">
              Модуль ещё не пройден
            </span>
          </vs-button>
          </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import Tags from "@/components/admin/Tags";

export default {
  name: "UserCard",
  components: {Tags},

  props: ['user'],
  data() {
    return {
      tests: [],
      showPassword: false,
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
      tags: []
    }
  },
  async created() {
    this.tests = await this.$moduleRepository.showList(this.user.tests)
    this.tags = this.user.user_tags
  },
  methods: {
    async deleteTest(id) {
      await this.$userRepository.delete_test(this.user._id, id).then(() => {
        this.tests = this.tests.filter(t => t.test_id !== id)
      })
    },
    async addTag(tag) {
      await this.$userRepository.update(this.user._id, {$push: {user_tags: tag}}).then(() => {
        this.$nuxt.refresh()
        this.tags.push(tag)
      })
    },
    async deleteTag(tag) {
      await this.$userRepository.update(this.user._id, {user_tags: this.user.user_tags.filter(t => t !== tag)}).then(() => {
        this.$nuxt.refresh()
        this.tags = this.tags.filter(t => t !== tag)
      })
    },
  }
}
</script>

<style lang="sass" scoped>
.placeholder
  background-color: #a6a6a6
  border-radius: 20px
  display: inline-block
  padding: 10px 20px
  font-size: 14px
  margin-bottom: 20px
</style>
