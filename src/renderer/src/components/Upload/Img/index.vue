<template>
  <div class="uploadImg">
    <div class="uploadImg-content">
      <div v-for="img in imgListData" :key="img.file.uid" class="item">
        <div class="tool">
          <i class="ys-icon" @click="remove(img)">&#xe658;</i>
          <i class="ys-icon" @click="preview(img.file, $event)">&#xe66a;</i>
          <i class="ys-icon" @click="replace(img)">&#xe614;</i>
        </div>
        <a-image :key="img.file.uid" :src="img.file.preview" />
      </div>
      <div v-if="imgListData.length < count" class="item uploadBtn" @click="triggerOpenFile">
        <i class="ys-icon">&#xe6d6;</i>
      </div>
    </div>
    <a-upload
      v-show="false"
      :custom-request="request"
      :show-upload-list="false"
      :file-list="imgListData"
      :before-upload="beforeUpload"
      :multiple="multiple && replaceIdx === -1"
    >
      <i ref="uploadRef"></i>
    </a-upload>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { delay } from 'lodash'
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 10
  },
  size: {
    type: Number,
    default: 10
  },
  accept: {
    type: String,
    default: '.png,.jpg,.jpeg'
  },
  fileList: {
    type: Array,
    default() {
      return []
    }
  },
  drag: {
    type: [Boolean, Function],
    default: false
  },
  cover: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: null
  },
  uploadHidden: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: true
  }
})
const sizeState = ref(false) // 个数是否超过限制
const imgListData = reactive(props.fileList)

const getBase64 = (img) => {
  return new Promise((res, rej) => {
    try {
      const reader = new FileReader()
      reader.addEventListener('load', () => res(reader.result))
      reader.readAsDataURL(img)
    } catch (error) {
      rej(error)
    }
  })
}

//上传接口

const request = async (data) => {
  const preview = await getBase64(data.file)
  Object.assign(data.file, {
    status: null,
    preview
  })

  if (props.autoUpload) {
    //处理自动上传逻辑请求接口，返回处理后的数据给data 赋值
  }

  //手动上传逻辑 由于不会调用接口。后续通过imgListData 手动处理

  if (replaceIdx.value === -1) {
    return imgListData.push(data) //添加图片
  } else {
    imgListData.splice(replaceIdx.value, 1, data) //替换图片
  }
}

//上传前回调
const beforeUpload = async (file, fileLists) => {
  const acceptArr = props.accept.split(',')
  const acceptState = acceptArr.some((item) => file.type.includes(item.replace('.', '')))
  if (!acceptState) {
    message.warning(`格式错误，请上传${props.accept.toUpperCase()} 格式文件`, 1)
    return Promise.reject()
  }

  if (file.size / 1024 / 1024 > props.size) {
    message.warning(`${file.name}图片超过${props.size}M`, 1)
    return Promise.reject()
  }
  if (imgListData.length + fileLists.length > props.count && replaceIdx.value === -1) {
    if (!sizeState.value) {
      sizeState.value = true
      await message.warning(`最多上传${props.count}张图片`, 1)
      sizeState.value = false
    }
    return Promise.reject()
  }

  return Promise.resolve(file)
}

//删除图片
const remove = (img) => {
  const idx = imgListData.findIndex((i) => i === img)
  imgListData.splice(idx, 1)
}

//替换

const replaceIdx = ref(-1)
const replace = (img) => {
  triggerOpenFile()
  replaceIdx.value = imgListData.findIndex((i) => i === img)
}

//图片预览

//预览
const preview = async (file, e) => {
  const el = e.target.parentNode.parentNode.querySelector('.ant-image')
  el.click()
}

//

const uploadRef = ref(null)

const triggerOpenFile = async () => {
  replaceIdx.value = -1
  await nextTick()
  delay(() => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
    uploadRef.value.previousElementSibling.dispatchEvent(event)
  })
}

defineExpose({ triggerOpenFile })
</script>

<style lang="less" scoped>
.uploadImg {
  .uploadImg-content {
    display: flex;
  }

  .item {
    width: 64px;
    height: 64px;
    border-radius: @border-radius-base;
    overflow: hidden;
    background: #cecece;
    margin-right: 12px;
    margin-bottom: 12px;
    position: relative;

    :deep(.ant-image) {
      width: 100%;
      height: 100%;

      .ant-image-mask {
        display: none;
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }

    &.uploadBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #fafafa;
      .ys-icon {
        font-size: 26px;
        color: #e6e8ed;
      }
    }

    .tool {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
      opacity: 0;
      transition: all 0.5s;
      display: flex;
      align-items: center;
      justify-content: center;

      .ys-icon {
        color: #fff;
        font-size: 16px;
        margin-left: 5px;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    &:hover {
      .tool {
        opacity: 1;
      }
    }
  }
}
</style>
