<template>
  <div>
    <div class="dashboard-container">
      <div class="app-container">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="account" label="登录账户设置">
              <!-- 放置表单 -->
              <el-form
                label-width="120px"
                style="margin-left: 120px; margin-top: 30px"
              >
                <el-form-item label="姓名:">
                  <el-input v-model="fromData.username" style="width: 300px" />
                </el-form-item>
                <el-form-item label="密码:">
                  <el-input
                    v-model="fromData.password"
                    style="width: 300px"
                    type="password"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateUserInfo"
                    >更新</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="user" label="个人详情">
              <UserInfo></UserInfo>
            </el-tab-pane>
            <el-tab-pane name="job" label="岗位信息" />
            <JobInfo />
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetails, saveUserDetailById } from '@/api'
import UserInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import JobInfo from './components/job-info.vue'
export default {
  data() {
    return {
      fromData: {},
      activeName: Cookies.get('employeesActiveName') || 'account'
    }
  },

  created() {
    this.getUserDetails()
  },
  components: {
    UserInfo,
    JobInfo
  },
  methods: {
    async getUserDetails() {
      const res = await getUserDetails(this.$route.params.id)
      this.fromData = res
    },
    async updateUserInfo() {
      await saveUserDetailById(this.fromData)
      this.$message.success('操作成功')
    },
    handleClick() {
      Cookies.set('employeesActiveName', this.activeName)
    }
  }
}
</script>

<style scoped></style>
