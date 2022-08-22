<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="postInfo"
            v-isHas="point.employees.import"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addDialogVisible"
            v-if="isHas(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employess">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                @click="showErCodeDialog(row.staffPhoto)"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="showAssignRole(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="onRemove(row.id)"
                v-if="point.employees.del"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <add-employees
      :visible.sync="visible"
      @getEmployessListApi="getEmployessListApi"
    ></add-employees>
    <el-dialog title="二维码" :visible.sync="dialogVisible">
      <canvas id="canvas"></canvas>
    </el-dialog>

    <AssignRole
      :currentUserId="currentUserId"
      :visible.sync="showAssignRoleDialog"
    />
  </div>
</template>

<script>
import { getEmployessListApi, delEmployee } from '@/api'
import employees from '@/constant/employees'
const { exportExcelMapPath, hireType } = employees
import QRCode from 'qrcode'
import AddEmployees from './components/add-employees.vue'
import AssignRole from './components/assign-role.vue'
import mixinPermissions from '@/mixins/permission'

export default {
  mixins: [mixinPermissions],

  data() {
    return {
      employess: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      visible: false,
      dialogVisible: false,
      showAssignRoleDialog: false,
      currentUserId: ''
    }
  },

  created() {
    this.getEmployessListApi()
  },
  components: { AddEmployees, AssignRole },
  methods: {
    async getEmployessListApi() {
      const { rows, total } = await getEmployessListApi(this.pages)
      this.employess = rows
      // console.log(rows)
      this.total = total
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getEmployessListApi()
    },
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('是否确认删除？')
      await delEmployee(id)
      this.$message.success('操作成功！')
    },
    addDialogVisible() {
      this.visible = true
    },
    postInfo() {
      this.$router.push('import')
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployessListApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      // console.log(header)

      // data数据
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2']
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户未设置头像')

      this.dialogVisible = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, staffPhoto)
      })
    },
    showAssignRole(id) {
      this.showAssignRoleDialog = true
      this.currentUserId = id
    }
  }
}
</script>

<style scoped lang="less"></style>
