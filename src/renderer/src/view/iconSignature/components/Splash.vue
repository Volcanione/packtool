<template>
  <div class="uploadImg">
    <div ref="sortContent" class="uploadImg-content">
      <div class="indexes">
        <span v-for="(item, idx) in splashImgListData" :key="idx" class="idx">{{ idx + 1 }}</span>
      </div>
      <div
        v-for="l in splashImgListData"
        :key="l[0].uid"
        class="line"
        :class="{ drag: l.length % 2 === 0 }"
      >
        <div class="title">
          <span>内容图</span>
          <span>底图</span>
        </div>
        <i class="ys-icon dargIcon">&#xe6a9;</i>
        <div v-for="img in l" :key="img.file.uid" class="item">
          <div class="tool">
            <!-- <i class="ys-icon" @click="remove(img)">删</i> -->
            <i class="ys-icon" @click="preview(img.file, $event)">&#xe66a;</i>
            <i class="ys-icon" @click="replace(img)">&#xe614;</i>
          </div>
          <a-image :key="img.file.uid" :src="img.file.preview" />
        </div>
        <div v-if="l.length % 2 === 1" class="item coverage" @click="replace()">
          <i class="ys-icon coverageIcon">&#xe6d6;</i>
        </div>
        <i class="ys-icon removeIcon" @click="removeLine(l)">&#xe658;</i>
      </div>

      <div class="uploadBtn" @click="triggerOpenFile"><i class="ys-icon">&#xe647;</i>添加闪屏</div>
      <div class="tips">
        1.内容图与底图将作为一张闪屏图片展示，内容图居中根据屏幕高度等比例展示，底图为自适应平铺展示；<br />
        2.闪屏顺序将根据上方的顺序展现，拖动可以调整顺序； 3.最多添加 10 张，支持 2M 以内的 PNG
        图片。
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
import { ref, reactive, nextTick, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { delay, chunk } from 'lodash'
import Sortable from 'sortablejs'
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
const splashImgListData = computed(() => {
  console.log(11)
  return chunk(imgListData, 2)
})

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
    return imgListData.push(data)
  } else {
    imgListData.splice(replaceIdx.value, 1, data)
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

  if (imgListData.length + fileLists.length > props.count && props.count !== 1) {
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
// const remove = (img) => {
//   const idx = imgListData.findIndex((i) => i === img)
//   imgListData.splice(idx, 1)
// }

const removeLine = (l) => {
  l.forEach((img) => {
    const idx = imgListData.findIndex((i) => i === img)
    imgListData.splice(idx, 1)
  })
}

//替换

const replaceIdx = ref(-1)
const replace = (img) => {
  triggerOpenFile()
  if (!img) {
    replaceIdx.value = imgListData.length
  } else {
    replaceIdx.value = imgListData.findIndex((i) => i === img)
  }
}

//图片预览

//预览
const preview = async (file, e) => {
  const el = e.target.parentNode.parentNode.querySelector('.ant-image')
  el.click()
}
//拖拽排序
const sortContent = ref(null)
const setSort = (el) => {
  if (!el || props.disabled) {
    return
  }

  new Sortable(el, {
    group: 'uploadImg',
    sort: true,
    animation: 150,
    draggable: '.drag',
    async onEnd({ oldIndex, newIndex }) {
      const sourceLine = splashImgListData.value[oldIndex - 1]
      const destinationLine = splashImgListData.value[newIndex - 1]
      const oldIndex_1 = imgListData.findIndex((i) => i.uid === sourceLine[0].uid)
      const newIndex_1 = imgListData.findIndex((i) => i.uid === destinationLine[0].uid)
      imgListData.splice(oldIndex_1, 2)
      await nextTick()
      imgListData.splice(newIndex_1, 0, ...sourceLine)
      // console.log(imgListData)

      // console.log(sourceLine, destinationLine)
      // console.log(oldIndex, newIndex)
    }
  })
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

const init = () => {
  setSort(sortContent.value)
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.uploadImg {
  .uploadImg-content {
    display: flex;
    flex-direction: column;
    position: relative;
    .indexes {
      position: absolute;
      display: flex;
      flex-direction: column;
      .idx {
        height: 100px;
        margin-bottom: 8px;
        color: #c3c3c3;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .line {
    display: flex;
    background: #f7f8fa;
    border-radius: @border-radius-base;
    margin-bottom: 8px;
    align-items: center;
    height: 100px;
    width: 350px;
    position: relative;
    margin-left: 20px;

    .dargIcon {
      color: #d8d8d8;
      margin-left: 30px;
      margin-right: 44px;
    }

    .removeIcon {
      color: @text-color3;
      padding-left: 8px;
      font-size: 22px;
    }

    .title {
      position: absolute;
      top: 0;
      width: 168px;
      left: 90px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      height: 22px;
      align-items: center;

      span {
        width: 68px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }

  .item {
    width: 68px;
    height: 68px;
    border-radius: @border-radius-base;
    overflow: hidden;
    background: #cecece;
    position: relative;
    margin-right: 32px;
    transform: translateY(6px);

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

  .coverage {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .coverageIcon {
      color: #e6e8ed;
      font-size: 36px;
    }
  }

  .uploadBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 350px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    color: #c3c3c3;
    border: 1px dashed #e6e8ed;
    margin-left: 20px;
    .ys-icon {
      font-size: 12px;
      margin-right: 4px;
    }
  }
  .tips {
    color: #939599;
    line-height: 14px;
    margin-left: 20px;
    margin-top: 12px;
    width: 350px;
    font-size: 12px;
  }
}
</style>
