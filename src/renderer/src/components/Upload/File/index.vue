<template>
  <div class="uploadFile">
    <div class="uploadFile-content">
      <div v-for="f in fileListData" :key="f.file.uid" class="item">
        <span class="name ellipsis">{{ f.file.name }}</span>
        <div class="tool">
          <i class="ys-icon" @click="remove(f)">&#xe658;</i>
          <i class="ys-icon" @click="replace(f)">&#xe614;</i>
          <span class="download" @click="download(f)">下载文件</span>
        </div>
      </div>
      <div v-if="fileListData.length < count" class="item uploadBtn" @click="triggerOpenFile">
        <i class="ys-icon">&#xe674;</i>
        <span class="placeholder">点击此处上传文件</span>
      </div>
    </div>
    <a-upload
      v-show="false"
      :custom-request="request"
      :show-upload-list="false"
      :file-list="fileListData"
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
import { downloadFile } from '@renderer/utils/'
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
    default: 4
  },
  size: {
    type: Number,
    default: 10
  },
  accept: {
    type: String,
    default: '.*'
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
const fileListData = reactive(props.fileList)

//上传接口

const request = async (data) => {
  Object.assign(data.file, {
    status: null
  })

  if (props.autoUpload) {
    //处理自动上传逻辑请求接口，返回处理后的数据给data 赋值
  }

  //手动上传逻辑 由于不会调用接口。后续通过imgListData 手动处理

  if (replaceIdx.value === -1) {
    return fileListData.push(data) //添加文件
  } else {
    fileListData.splice(replaceIdx.value, 1, data) //替换文件
  }
}

const beforeUpload = async (file, fileLists) => {
  const acceptArr = props.accept.split(',')
  const acceptState = acceptArr.some((item) => file.type.includes(item.replace('.', '')))
  if (!acceptState && props.accept !== '.*') {
    message.warning(`格式错误，请上传${props.accept.toUpperCase()} 格式文件`, 1)
    return Promise.reject()
  }

  if (file.size / 1024 / 1024 > props.size) {
    message.warning(`${file.name}文件超过${props.size}M`, 1)
    return Promise.reject()
  }
  if (fileListData.length + fileLists.length > props.count && replaceIdx.value === -1) {
    if (!sizeState.value) {
      sizeState.value = true
      await message.warning(`最多上传${props.count}个文件`, 1)
      sizeState.value = false
    }
    return Promise.reject()
  }

  return Promise.resolve(file)
}

//删除
const remove = (file) => {
  const idx = fileListData.findIndex((i) => i === file)
  fileListData.splice(idx, 1)
}

//下载
const download = (f) => {
  if (f.file instanceof File) {
    //直接下载file文件
    downloadFile(f.file)
  } else {
    //通过url地址下载
  }
}

//替换

const replaceIdx = ref(-1)
const replace = (file) => {
  triggerOpenFile()
  replaceIdx.value = fileListData.findIndex((i) => i === file)
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
.uploadFile-content {
  .item {
    height: 40px;
    background: #f7f8fa;
    border-radius: @border-radius-base;
    border: 1px solid #e6e8ed;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 6px;

    .ys-icon {
      color: #cecece;
    }
    .name {
      flex: 1;
      overflow: hidden;
    }
    .tool {
      display: flex;
      overflow: hidden;
      align-items: center;
    }

    .placeholder {
      color: #b7b7b7;
      margin-left: 16px;
    }
    .download {
      font-size: 12px;
      color: @primary-color;
      cursor: pointer;
    }
  }
}
</style>
