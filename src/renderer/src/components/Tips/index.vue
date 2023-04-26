<template>
  <div class="Tips">
    <i class="ys-icon">&#xe693;</i>
    <slot />
  </div>
</template>

<style lang="less" scoped>
.Tips {
  padding: 9px 16px;
  border-radius: @border-radius-base;
  border: 1px solid #e6e8ed;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: baseline;
  font-size: 12px;
  line-height: 16px;
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    background: #3a7cff;
    border-radius: 4px 0px 0px 4px;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .ys-icon {
    color: @primary-color;
    margin-right: 8px;
    font-size: 14px;
  }
}
</style>
