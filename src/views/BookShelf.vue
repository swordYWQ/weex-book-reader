<template>
  <!-- <div> -->
    <scroller class="scroller">
      <div class="box-list">
        <div class="box-list-item" v-for="n in 10" :key="n">
          <image class="item-image" src="http://pic.qiantucdn.com/58pic/16/81/64/46S58PIC7Qk.jpg!/fw/300/clip/0x400a0a0/format/webp"></image>
          <text class="item-text" :line="2">书名</text>
        </div>
      </div>
    </scroller>
    <!-- </div> -->
</template>
<script>
export default {
  name: 'book-list'
}
</script>
<style scoped>
.scroller{
  /* height:calc(100% - 240px); */
}
.box-list {
  /* height: calc(100% - 120px); header高度为120 */
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.box-list-item {
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  /* margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px; */
  width: 250px;
  height: 330px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.item-image {
  width: 220px;
  height: 260px;
}
.item-text {
  text-align: center;
  font-size:40px;
}
</style>
