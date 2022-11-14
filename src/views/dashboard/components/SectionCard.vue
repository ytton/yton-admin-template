<template>
  <a-card class="section-card" title="Arco Card">
    <template #extra>
      <div class="section-card__action">
        <a-select
          v-if="!props.hiddenSelect"
          style="width: 70px; margin-right: 10px"
          default-value="周"
        >
          <a-option value="周">周</a-option>
          <a-option value="月">月</a-option>
          <a-option value="日">日</a-option>
        </a-select>
        <a-button>
          <template #icon><icon-more-vertical /> </template>
        </a-button>
      </div>
    </template>
    <slot></slot>
  </a-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  hiddenSelect?: boolean
}>()
</script>

<style scoped lang="less">
.section-card {
  border-radius: 5px;
  &__action {
    display: flex;
    align-items: center;
  }
  :deep(.arco-card-header) {
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0px;
      width: 4px;
      top: 50%;
      transform: translate(-1px, -50%);
      height: 1.3em;
      background-color: #40a3e4;
    }
  }
  :deep(.arco-card-body) {
    height: calc(100% - 46px);
    box-sizing: border-box;
    overflow-x: hidden;
  }
}
</style>
