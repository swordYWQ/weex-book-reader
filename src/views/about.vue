<template>
    <div>
      <view-header title="关于" :isShowBack="true" @back="goback"></view-header>
      <div class="about-view">
        <div class="about-cell">
          <text class="about-text pink">LOVEYOUHMF</text>
        </div>
        <div class="about-cell">
          <text class="about-text">YU小说</text>
        </div>
        <div class="about-cell">
          <text class="about-text gray">本项目基于weex+vue进行开发，脚手架基于weex-hacknews，是在weex开发原生项目的一次尝试。</text>
        </div>
        <div class="about-cell">
          <text class="about-text gray">版本:v1.1</text>
        </div>
        <div class="about-cell">
          <text class="about-text gray">作者:weiqiang.yu</text>
        </div>
        <div class="about-cell">
          <text class="about-text pink">LOVEYOUHMF</text>
        </div>
      </div>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'

export default {
  name: 'rank',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
    }
  },
  methods: {
    goback(){
      this.$router.back()
    },
  }
}
</script>
<style scoped>
.about-view{
  justify-content: center;
  align-items: center;
  height: 1212px;
}
.about-cell{

}
.gray{
  color:gray;
}
.pink{
  color:pink;
  font-size:60px;
  font-weight: 700;
}
.about-text{
  font-size:30px;
  text-align: center;
}
</style>

