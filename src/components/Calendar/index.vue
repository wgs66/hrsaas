<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="8" style="margin-right: 5px">
        <el-select
          v-model="currentYear"
          placeholder="请选择"
          @change="updateCalendar"
        >
          <el-option
            v-for="item in Years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></el-col>

      <el-col :span="6">
        <el-select
          v-model="currentMonth"
          placeholder="请选择"
          @change="updateCalendar"
        >
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option> </el-select
      ></el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      Years: [], //当前年份的 + 前5年 + 后5年
      currentYear: '',
      currentMonth: '',
      currentDate: []
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.Years = Array.from(
        Array(11)
          .fill(this.currentYear - 5)
          .map((item, i) => item + i)
      )
      this.currentDate = date
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table td {
  border: none !important;
}
.cell-box {
  color: #333;
  display: flex;
  span {
    color: #fff;
    background-color: #fa7c4d;
    margin-left: 5px;
    padding: 2px 3px;
    border-radius: 14px;
    font-size: 12px;
  }
}
</style>
