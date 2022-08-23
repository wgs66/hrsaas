<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="onRequest"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :class="fileList.length ? 'hide' : ''"
      class="current-preview"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
// id:AKIDnQsHXaPzLVTEl4A2rVzHMEsJXXJ1Xr0z
// key:ub6RaVF1d2gKoAQW2Yr00qTt64oJagZD
// SecretId: 'SECRETID',
//     SecretKey: 'SECRETKEY',
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDnQsHXaPzLVTEl4A2rVzHMEsJXXJ1Xr0z',
  SecretKey: 'ub6RaVF1d2gKoAQW2Yr00qTt64oJagZD'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'wgs-1313341644' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          // console.log(err || data)
          if (err || data.statusCode != 200) {
            return this.$message.error('上传失败，刷新重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
      console.log(fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.dialogVisible = true
      this.imgUrl = file.url
      // console.log(file)
    },
    beforeUpload(file) {
      const types = ['image/gif', 'image/jpeg']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      // 限制大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.current-preview {
  width: 149px;
  height: 149px;
  overflow: hidden;
}
</style>
