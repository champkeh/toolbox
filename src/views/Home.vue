<template>
  <div class="page">
    <a-upload
      name="avatar"
      listType="picture-card"
      @change="handleChange"
      :beforeUpload="beforeUpload"
      :showUploadList="false"
    >
      <img ref="image" class="img" v-if="imageUrl" :src="imageUrl" alt="avatar"/>
      <div v-else>
        <a-icon type="plus"/>
        <div class="ant-upload-text">Select</div>
      </div>
    </a-upload>
    <a-button type="default">转黑白</a-button>
    <canvas ref="canvas"></canvas>
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
      imageUrl: null,
      canvas: null,
      context: null,
      image: null,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
  },
  methods: {
    handleChange (info) {
      const { file } = info
      // Get this url from response in real world.
      getBase64(file, imageUrl => {
        this.imageUrl = imageUrl

        this.$nextTick(() => {
          const img = this.$refs.image

          this.image = img
          this.width = img.width
          this.height = img.height

          this.drawImage()
        })
      })
    },
    drawImage() {
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.context.drawImage(this.image, 0, 0, this.width, this.height)
      this.$nextTick(() => {
        // this.processPixel()
      })
    },
    processPixel() {
      // 获取图片像素信息
      const imageData = this.context.getImageData(0, 0, this.width, this.height)
      const pixels = imageData.data

      // 遍历像素点
      for (let i = 0; i < pixels.length; i++) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]

        // 获取灰色
        const gray = parseInt((r + g + b) / 3)

        pixels[i] = gray
        pixels[i + 1] = gray
        pixels[i + 2] = gray
      }

      this.context.putImageData(imageData, 0, 0)
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
    /*max-width: 300px;*/
  }
</style>
