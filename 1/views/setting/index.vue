<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="addRoleDialog"
            v-isHas="point.roles.add"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success"
                  @click="setRightsDialogVisble(scope.row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="onRemoveRoles(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :page-sizes="[2, 4, 8, 10]"
            layout="sizes,prev, pager, next"
            :total="total"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <!-- 提示 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <!-- 表格 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="CompanyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="CompanyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="CompanyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="CompanyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        :model="addRoleFrom"
        :rules="addRoleFromRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleFrom.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button @click="onAddRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog
      title="提示"
      :visible.sync="setRightsDialog"
      width="50%"
      :close-on-click-modal="false"
      destroy-on-close
      @close="RolesDialogClose"
    >
      <el-tree
        :data="permissionList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckKeys"
        :props="{ label: 'name' }"
        ref="perTree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary" @click="onRoleAdds">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleApi,
  postRpleApi,
  getCompanyInfo,
  getPermissionList,
  getRolesInfo,
  removeRolesApi,
  assignPerm
} from '@/api'
import { listDesc } from '@/utils'
import mixinPermissions from '@/mixins/permission'
export default {
  mixins: [mixinPermissions],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false,
      setRightsDialog: false,
      CompanyInfo: {},
      addRoleFrom: {
        name: '', // 部门名称
        description: ''
      },
      addRoleFromRules: {
        name: [{ required: true, message: '请输入新增内容', trigger: 'blur' }]
      },
      permissionList: [],
      defaultCheckKeys: [],
      roleId: ''
    }
  },

  created() {
    this.getRole()
    this.getCompanyInfo()
    this.getPermissionList()
  },

  methods: {
    async getRole() {
      const { rows, total } = await getRoleApi({
        page: this.page,
        pagesize: this.pageSize
      })
      // console.log(rows)
      this.total = total
      this.tableData = rows
    },
    currentChange(val) {
      this.page = val
      this.getRole()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRole()
    },
    addRoleDialog() {
      this.addDialogVisible = true
    },
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      console.log('校验通过')
      await postRpleApi(this.addRoleFrom)
      this.$message.success('操作成功')
      this.addDialogVisible = false
      this.getRole()
    },

    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleFrom.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      // console.log(res)
      this.CompanyInfo = res
    },
    async onRemoveRoles(id) {
      await removeRolesApi(id)
      this.$message.success('删除成功')
      this.getRole()
    },
    async setRightsDialogVisble(id) {
      this.setRightsDialog = true
      this.roleId = id
      // console.log(id)
      const res = await getRolesInfo(id)
      this.defaultCheckKeys = res.permIds
      // console.log(this.defaultCheckKeys)
    },
    // 获取权限列表
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res)
      const treePermissions = listDesc(res, '0')
      // console.log(treePermissions)
      this.permissionList = treePermissions
    },
    RolesDialogClose() {
      this.defaultCheckKeys = []
    },
    async onRoleAdds() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.setRightsDialog = false
    }
  }
}
</script>

<style scoped lang="less"></style>
