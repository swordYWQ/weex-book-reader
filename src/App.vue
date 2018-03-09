<template>
  <div @androidback="back">
    <router-view style="flex:1"></router-view>
    <wxc-loading :show="loadingState"
                 type="default"
                 loading-text="加载中"
                 :interval="0"></wxc-loading>
  </div>
</template>

<script>
var globalEvent = weex.requireModule('globalEvent')
var domModule = weex.requireModule('dom')
var modal = weex.requireModule('modal')
var close = weex.requireModule('close')
import { WxcLoading } from 'weex-ui'
export default {
  components: { 'wxc-loading': WxcLoading },
  data() {
    return {
      preClose: false
    }
  },
  computed: {
    loadingState() {
      return this.$store.state.loadingState
    }
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
          modal.toast({
            message: '再按一次返回关闭应用',
            duration: 1
          })
          this.setTimeout(() => {
            this.preClose = false
          }, 1000)
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
