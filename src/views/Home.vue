<template>
  <div class="page">
    <a-upload
      name="avatar"
      listType="picture-card"
      @change="handleChange"
      :beforeUpload="beforeUpload"
      :showUploadList="false"
    >
      <img class="img" v-if="imageUrl" :src="imageUrl" alt="avatar"/>
      <div v-else>
        <a-icon type="plus"/>
        <div class="ant-upload-text">Select</div>
      </div>
    </a-upload>
    <a-button type="default">转黑白</a-button>
  </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      imageUrl: null
    }
  },
  methods: {
    handleChange (info) {
      const { file } = info
      // Get this url from response in real world.
      getBase64(file, imageUrl => {
        this.imageUrl = imageUrl
      })
    },
    beforeUpload () {
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
  .page {
    width: 80%;
    margin: 0 auto;
  }
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .img {
    max-width: 300px;
  }
</style>
