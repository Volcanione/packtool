<template>
  <a-form :colon="false" layout="vertical">
    <Tips class="tips">修改图标闪屏，需要重新使用打包工具出包，否则不会生效。</Tips>
    <a-form-item label="图标">
      <div class="upload-img-content">
        <UploadImg
          ref="UploadImgRef"
          :auto-upload="false"
          :count="1"
          :size="2"
          :file-list="ICONfileList"
        />
        <div class="info-content">
          <template v-if="!ICONfileInfo">
            <a-button @click="UploadImgRef?.triggerOpenFile"
              ><i class="ys-icon">&#xe614;</i>上传图片</a-button
            >
            <span class="tips"
              >支持 2M 以内的 PNG
              图片，建议尺寸：512*512；若渠道有特定角标要求，请上传带有角标的图标。</span
            >
          </template>
          <template v-else>
            <span class="filename ellipsis">{{ ICONfileInfo.name }}</span>
            <span class="filesize">{{ ICONfileInfo.size }}</span>
          </template>
        </div>
      </div>
    </a-form-item>
    <a-form-item label="闪屏">
      <Splash :auto-upload="false" multiple />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="sumbit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Splash from './Splash.vue'
const UploadImgRef = ref(null)
const ICONfileList = reactive([])

const ICONfileInfo = computed(() => {
  if (!ICONfileList.length) {
    return null
  }

  return {
    name: ICONfileList[0].file.name,
    size: `${Math.ceil(ICONfileList[0].file.size / 1024)} KB`
  }
})
</script>

<style lang="less" scoped>
.tips {
  margin-bottom: 16px;
}

.upload-img-content {
  background: #f7f8fa;
  border-radius: @border-radius-base;
  padding: 16px;
  display: flex;

  :deep(.item) {
    background: #ffffff !important;
    margin: 0;
  }
  .info-content {
    margin-left: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
    .tips {
      font-size: 12px;
      color: @text-color3;
      line-height: 14px;
      margin-bottom: 8px;
    }
    .filename {
      line-height: 20px;
      margin-top: 5px;
      flex: 1;
      width: 566px;
    }
    .filesize {
      font-size: 12px;
      color: @text-color3;
      line-height: 14px;
      margin-bottom: 13px;
    }
  }
}
.sumbit {
  float: right;
  margin-top: 8px;
}
</style>
