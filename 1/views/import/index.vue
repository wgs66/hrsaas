<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="UploadSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
import { importEmployess } from '@/api'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    UploadSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请上传.xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      // console.log(header)
      // console.log(results)
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const data = new Date((timestamp - 1) * 24 * 3600000)
            data.setFullYear(data.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(data)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })

      await importEmployess(newArr)
      this.$message.success('操作成功')
      this.$router.go(-1)
      console.log(111)
    }
  }
}
</script>

<style scoped></style>
