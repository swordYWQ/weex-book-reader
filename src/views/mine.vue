<template>
  <!-- <div> -->
    <!-- <view-header title="我的"></view-header> -->
    <scroller class="scroller">
      <!-- <list class="list"> -->
        <!-- <div class="cell">
          <div class="panel">
            <text class="text">主题风格</text>
          </div>
        </div> -->
        <!-- <div class="cell">
          <div class="panel">
            <text class="text">设置</text>
          </div>
        </div> -->
        <div class="cell">
          <div class="panel" @click="clearStorage">
            <text class="text">清理缓存</text>
          </div>
        </div>
        <div class="cell">
          <div class="panel" @click="set">
            <text class="text">设置</text>
          </div>
        </div>
        <div class="cell">
          <div class="panel" @click="jump({name:'about'})">
            <text class="text">关于</text>
          </div>
        </div>
      <!-- </list> -->
    </scroller>
    <!-- </div> -->
</template>
<script>
var modal = weex.requireModule('modal')
export default {
  name: 'category',
  methods:{
    set(){
      modal.toast({
            message: '暂未开发',
            duration: 1
      })
    },
    clearStorage(){
      this.$store.dispatch('clearStorage')
    }
  }
}
</script>
<style scoped>
.scroller{
  /* height:calc(100% - 240px); */
}
.cell{
  height: 100px;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #DDDDDD;
}
.panel{

}
.text{
  font-size:45px;
  color: #666666;
}
</style>

