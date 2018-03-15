<template>
  <div @androidback="back">
    <!-- <keep-alive> -->
    <router-view style="flex:1"></router-view>
    <!-- <wxc-loading :show="loadingState"
                 type="default"
                 loading-text="加载中"
                 :interval="0"></wxc-loading> -->
                 <!-- </keep-alive> -->
                 <Loadings ref="loadings" :isShow="isShow" v-if="isShow"></Loadings>
  </div>
</template>

<script>
var globalEvent = weex.requireModule('globalEvent')
var domModule = weex.requireModule('dom')
// var modal = weex.requireModule('modal')
var close = weex.requireModule('close')
// import { WxcLoading } from 'weex-ui'
import Loadings from './components/loading.vue'
export default {
  components: {
    // 'wxc-loading': WxcLoading,
    Loadings: Loadings
  },
  data() {
    return {
      preClose: false
    }
  },
  computed: {
    isShow() {
      return this.$store.state.loadingState
    },
  },
  created() {
    globalEvent.addEventListener('androidback', e => {
      // 这里就可以做返回事件操作了，如返回上一页或退出应用
      // that.$router.go(-1)
      // weex.requireModule('close').closeApp()
      this.back()
    })

    //目前支持ttf、woff文件，不支持svg、eot类型,moreItem at http://www.iconfont.cn/
    domModule.addRule('fontFace', {
      fontFamily: 'iconfont1',
      src: "url('http://at.alicdn.com/t/font_562191_gi5uyqubw41s8aor.ttf')"
    })
    // this.initLocalData()

    // setTimeout(()=>{
    //   console.log(weex.config.env)
    //   console.log('isShow:',this.$refs.loadings.isShow)
    //   console.log('loadingStyle:',this.$refs.loadings.loadingStyle)
    //   console.log('loadingCenter:',this.$refs.loadings.loadingCenter)
    // },5000)
  },
  methods: {
    back: function() {
      let routeName = this.$route.name
      if (
        routeName === 'home' ||
        routeName === 'bookshelf' ||
        routeName === 'find' ||
        routeName === 'mine'
      ) {
        // console.log('exit')
        if (this.preClose) {
          close.closeApp()
        } else {
          this.preClose = true
          this.toast({
            message: '再按一次返回关闭应用',
            duration: 0.5
          })
          setTimeout(() => {
            this.preClose = false
          }, 500)
        }
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style>
@import './assets/css/main.css';
</style>
