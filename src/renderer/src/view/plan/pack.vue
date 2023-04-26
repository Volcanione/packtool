<template>
  <div class="pack">
    <div class="header">
      <div class="icon"></div>
      <div class="info">
        <div class="title">BA 国服（CN-BA）SDK 版本号 4.2.0</div>
        <div class="tips">
          android_official、android_bilibili 正在打包，请勿进行其他操作，请耐心等待打包完成
        </div>
      </div>
      <a-button class="cancel" @click="cancel">取消打包</a-button>
    </div>
    <div class="line"></div>
    <a-collapse v-model:activeKey="activeKey" accordion expand-icon-position="right">
      <a-collapse-panel v-for="pack in packConfigList" :key="pack.id" force-render>
        <template #header>
          <div class="packTitle">
            <LoadingOutlined v-if="pack.status === 0" class="loading" />
            <CloseCircleFilled v-if="pack.status === 1" class="success" />
            <CheckCircleFilled v-if="pack.status === 2" class="fail" />
            <span class="name">
              {{ pack.channel }}
            </span>
            <a-progress :percent="50" :show-info="false" />
          </div>
        </template>
        <Code :data="pack" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import { storePack } from '@renderer/pinia/pack.js'
import { RouteConfig } from '@renderer/mixins/'
import { LoadingOutlined, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons-vue'
import Code from './components/Code.vue'
const setRouteViewLoading = inject('setRouteViewLoading')
const setRouteViewheader = inject('setRouteViewheader')
const { router } = RouteConfig()
const { startPack, packConfigList } = storePack()

const activeKey = ref('') //当前打开面板

const init = async () => {
  await startPack()
  //初始化处理完数据后取消loading
  setRouteViewheader(false)
  setRouteViewLoading(false)
}

const cancel = () => {
  router.replace('/')
}

init()
</script>

<style lang="less" scoped>
.pack {
  .header {
    height: 64px;
    display: flex;
    align-items: center;
    margin-top: 35px;
    margin-bottom: 25px;

    .icon {
      width: 64px;
      height: 100%;
      border-radius: 50%;
      background: #cecece;
      margin-right: 16px;
    }

    .info {
      flex: 1;
      margin-right: 16px;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 24px;
        font-weight: 600;
        color: #2d3440;
        line-height: 22px;
        margin-bottom: 8px;
      }

      .tips {
        color: @text-color3;
      }
    }

    .cancel {
      margin-top: 28px;
    }
  }

  .line {
    border: 1px solid #edeff2;
    margin-bottom: 20px;
  }

  .ant-collapse {
    background: transparent !important;
    border: none;

    :deep(.ant-collapse-item) {
      margin-bottom: 16px;
      border: 1px solid #e6e8ed;
      border-radius: @border-radius-base;

      .ant-collapse-header {
        background: #f7f8fa;
      }

      .ant-collapse-content {
        border-color: #e6e8ed;
      }
    }
  }
}

.packTitle {
  display: flex;
  align-items: center;
  width: 100%;
  .name {
    margin-left: 16px;
    margin-right: 6px;
  }

  .success {
    color: #22c070;
  }

  .fail {
    color: #e84a4a;
  }
}
</style>
