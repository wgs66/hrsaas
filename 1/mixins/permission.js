import pointPermission from '@/constant/permission'

export default {
  data() {
    return {
      point: pointPermission
    }
  },
  methods: {
    isHas(point) {
      // console.log(point)
      return this.$store.state.permission.points.includes(point)
    }
  }
}
