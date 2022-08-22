<template>
  <el-dialog
    title="分配角色"
    :visible="visible"
    @close="colse"
    :close-on-click-modal="false"
    @open="onOpen"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="colse">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleApi, getUserDetails, assignRoles } from '@/api'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentUserId: {
      type: String,
      required: true
    }
  },
  methods: {
    colse() {
      this.$emit('update:visible', false)
    },
    async getRoleApi() {
      const { rows } = await getRoleApi()
      // console.log(roles)
      this.roles = rows
      // console.log(this.roles)
    },
    onOpen() {
      this.getRoleApi()
      this.getUserDetails()
    },
    async getUserDetails() {
      const { roleIds } = await getUserDetails(this.currentUserId)
      this.checkList = roleIds
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')

      await assignRoles({
        id: this.currentUserId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.colse()
    }
  }
}
</script>
