<template>
  <div class="radar" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main) // 绘制图表
      // 绘制图表
      myChart.setOption({
        title: {
          text: '人员绩效表'
        },
        textStyle: {
          color: 'red'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [40, 30, 20, 30, 50, 10],
                name: 'Allocated Budget'
              },
              {
                value: [50, 10, 28, 26, 42, 21],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.radar {
  width: 500px;
  height: 500px;
}
</style>
