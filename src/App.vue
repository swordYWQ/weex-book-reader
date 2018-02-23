<template>
  <div @androidback="back">
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    var domModule = weex.requireModule('dom')
    //目前支持ttf、woff文件，不支持svg、eot类型,moreItem at http://www.iconfont.cn/

    domModule.addRule('fontFace', {
      fontFamily: 'iconfont1',
      src: "url('http://at.alicdn.com/t/font_562191_chyrtiw99jurf6r.ttf')"
    })
  },
  methods: {
    back: function() {
      this.$router.back()
    }
  }
}
</script>
<style>
@import './assets/css/main.css';
</style>
