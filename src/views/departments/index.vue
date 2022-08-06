<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <TreeTools
          @add="showAddDept"
          :isRoot="true"
          :treeNode="company"
        ></TreeTools>
        <!-- 树形组件 -->
        <el-tree :data="departs" default-expand-all :props="defaultProps">
          <!-- 这是作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools
              :treeNode="data"
              @remove="loadDepts"
              @add="showAddDept"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>

    <AddDept
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @add-success="loadDepts"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept.vue'
import { getDepartmentList } from '@/api'
import { listDesc } from '@/utils'
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: { name: '传智教育', manager: '负责人' },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      currentNode: {}
    }
  },
  components: {
    TreeTools,
    AddDept
  },
  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDepartmentList()
      this.departs = listDesc(res.depts, '')
      // console.log(this.departs)
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    }
  }
}
</script>

<style scoped lang="less"></style>
