<template>
  <wxc-loading :show="isShow"
                 type="default"
                 loading-text="加载中"
                 :interval="0"></wxc-loading>
</template>
<script>
import { WxcLoading, WxcPartLoading } from 'weex-ui'
export default {
  components: { WxcLoading, WxcPartLoading },
  data() {
    return {
      isShow: true
    }
  }
}
</script>