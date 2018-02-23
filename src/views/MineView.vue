<template>
  <!-- <div> -->
    <!-- <view-header title="我的"></view-header> -->
    <scroller class="scroller">
      <!-- <list class="list"> -->
        <div class="cell" v-for="n in 20" :key="n">
          <div class="panel">
            <text class="text">我的{{n}}</text>
          </div>
        </div>
      <!-- </list> -->
    </scroller>
    <!-- </div> -->
</template>
<script>
// import viewHeader from '../components/view-header.vue'
export default {
  name: 'category',
  // components: {
  //   'view-header': viewHeader
  // }
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

