<template>
  <div id="notFounded">
    <div className="fof">
      <h1>{{ props.message }}</h1>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    default: 'Not Found 404',
  },
})
</script>

<style scoped lang="less">
#notFounded {
  color: #888;
  display: table;
  width: 100%;
  height: 100%;
  text-align: center;
}

#notFounded .fof {
  display: table-cell;
  vertical-align: middle;
}

#notFounded .fof h1 {
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: notFounded__Animation 0.5s alternate infinite;
}

@keyframes notFounded__Animation {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
