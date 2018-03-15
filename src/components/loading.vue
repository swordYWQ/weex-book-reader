<template>
  <!-- <wxc-loading :show="isShow"
                 type="default"
                 loading-text="加载中"
                 :interval="0"></wxc-loading>-->
                 <div class="loading-mark" :style="loadingStyle">
                   <div class="loading-content" :style="loadingCenter">
                     <text class="loading-icon">&#xe627;</text>
                   </div>
                 </div>
</template>
<script>
// import { WxcLoading, WxcPartLoading } from 'weex-ui'
var animation = weex.requireModule('animation')
var dom = weex.requireModule('dom')
export default {
  // components: { WxcLoading, WxcPartLoading },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // isShow() {
    //   return this.$store.state.loadingState
    // },
    loadingStyle() {
      let env = weex.config.env
      let deviceWidth = env.deviceWidth * env.scale
      let deviceHeight = env.deviceHeight * env.scale
      let tx = !this.isShow ? -width : 0
      return {
        transform: `translateX(${tx}px)`,
        width: `${deviceWidth}px`,
        height: `${deviceHeight}px`
      }
    },
    loadingCenter() {
      let env = weex.config.env
      let deviceWidth = env.deviceWidth * env.scale
      let deviceHeight = env.deviceHeight * env.scale
      let width = 75
      let height = 75
      let top = deviceHeight * 0.5 - height * 0.5
      let left = deviceWidth * 0.5 - width * 0.5

      return {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`
      }
    }
  },
  methods: {
    // loadingModalAnimation() {
    //   this.$nextTick(() => {
    //     let ref = this.$refs.loadings
    //     animation.transition(ref, {
    //       styles: {
    //         opacity: 1
    //       },
    //       duration: 50, //ms
    //       timingFunction: 'ease'
    //       // delay: 0 //ms
    //     })
    //   })
    // }
  }
  // watch: {
  //   isShow(v, ov) {
  //     if (v) {
  //       this.loadingModalAnimation()
  //     }
  //   }
  // }
}
</script>
<style scoped>
.loading-mark {
  /* opacity: 0; */
  /* transform: translate(-750px); */
  position: fixed;
  top: 0;
  left: 0;
  /* width: 750px;
  height: 1334px; */
}
.loading-content {
  position: absolute;
  /* top: 592px;
  left: 300px; */
  background-color: #333;
  justify-content: center;
  align-items: center;
  /* border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px; */
}
.loading-icon {
  font-family: iconfont1;
  text-align: center;
  font-size: 90px;
  color: #fff;
}
</style>
