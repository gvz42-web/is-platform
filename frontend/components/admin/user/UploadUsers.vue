<template>
  <div>
    <input
      accept=".xlsx"
      aria-label="upload image button"
      type="file"
      @change="onChange"
    />
  </div>
</template>

<script>
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
          for (let i = 0; i < data.length; i++) {
            const udata = data[i]
            const user = {
              first_name: udata[0],
              last_name: udata[1],
              email: udata[2],
              password: udata[3],
              user_tags: udata[4] ? udata[4].split(' ') : udata[4]
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

<style scoped>

</style>
