<template>
  <div>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="key === $i18n.locale"
          :command="key"
          v-for="(value, key) in messages"
          :key="key"
          >{{ value.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'

export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  mounted() {
    // console.log(this.messages)
  },
  methods: {
    onCommand(val) {
      this.$i18n.locale = val
      this.$router.go()
      Cookies.set('lang', val)
      // console.log(11)
    }
  }
}
</script>

<style scoped></style>
