<template>
  <div class="upload-block">
    <h2>Загрузить пользователей из таблицы:</h2>
    <input
      accept=".xlsx"
      aria-label="upload image button"
      type="file"
      @change="onChange"
    />
    <vs-button download="" href="/шаблон.xlsx" primary>Скачать шаблон таблицы</vs-button>
  </div>
</template>

<script>
import {generatePassword} from "@/utils/utils";

const XLSX = require('xlsx');
export default {
  name: "UploadUsers",
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type: 'binary'});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header: 1});
          const users = []
          for (let i = 1; i < data.length; i++) {
            const udata = data[i]
            const user = {
              first_name: udata[0],
              last_name: udata[1],
              email: udata[2],
              password: generatePassword(6),
              user_tags: udata[4] ? udata[4].split(',') : udata[4]
            }
            users.push(user)
          }
          this.$emit('upload', users)
        }

        reader.readAsBinaryString(this.file);
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.upload-block
  margin-top: 80px
</style>
