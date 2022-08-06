<template>
  <el-dialog
    @close="onClose"
    :title="dialogTitle"
    :visible="visible"
    width="30%"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formDataRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
            ref="optionSelect"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1-300个字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDepartmentList,
  getEmployessList,
  addDeptsApi,
  getDeptsApi,
  editDeptsApis
} from '@/api'
export default {
  data() {
    // 部门名称自定义验证
    const checkDeptName = async (rule, value, callback) => {
      //1  判断value是否和添加的同级部门重复

      // 判断是否存在 不存在直接回调
      if (this.formData.id) {
        // 编辑
        const { depts } = await getDepartmentList()
        const filterDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        )
        const isRepeat = filterDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()

        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        )
        // 2 如果重复了 cellback(new Error('部门重复'))
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }

    // 部门编码自定义验证
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDepartmentList()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }

    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formDataRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },
  created() {
    this.getEmployessList()
  },

  methods: {
    // 获取员工信息
    async getEmployessList() {
      const res = await getEmployessList()
      this.employees = res
      // console.log(res)
    },
    // 关闭弹窗
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 点击确定触发事件
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          // 修改部门
          await editDeptsApis(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          // 添加部门
          this.formData.pid = this.currentNode.id
          await addDeptsApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    },
    // 获取要修改的部门信息
    async getDeptByid(id) {
      this.formData = await getDeptsApi(id)
    }
  }
}
</script>

<style scoped></style>
