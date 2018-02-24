<template>
    <div>
      <view-header title="排行榜" :isShowBack="true" backName="findingview"></view-header>
      <scroller class="scroller">
      <div class="tab-sex">
        <div class="tab-sex-item" :class="[rankTimeType===1?'select':'']" @click="changeRankType(1)">
        <text class="tab-sex-item-text">周榜</text>
        </div>
        <div class="tab-sex-item" :class="[rankTimeType===2?'select':'']" @click="changeRankType(2)">
        <text class="tab-sex-item-text" >月榜</text>
         </div>
         <div class="tab-sex-item" :class="[rankTimeType===3?'select':'']" @click="changeRankType(3)">
        <text class="tab-sex-item-text" >总榜</text>
         </div>
      </div>
      <list>
        <cell v-for="(item,index) in bookList" :key="index" class="book-panel">
          <div class="book-img-panel">
            <image class="book-img" :src="imageHost+item.cover"></image>
          </div>
          <div class="book-desc">
            <text class="book-title">{{item.title}}</text>
            <text class="book-author">{{item.author}}</text>
            <text class="book-short-info">{{item.shortIntro}}</text>
          </div>
        </cell>
      </list>
        <!-- <div class="cell">
          <div class="panel" v-for="(item,index) in bookList" :key="index">
            <image class="category-icon" :src="imageHost+item.cover"></image>
            <text class="text">{{item.title}}</text>
          </div> -->
          <!-- <template v-if="getCollaspeLen(rankList)">
            <div class="panel" @click="isShowMore=!isShowMore">
              <image class="category-icon" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fvanfruits.com%2Fstatic%2Fimages%2Fmore-products-1.jpg&imgrefurl=https%3A%2F%2Fwww.vanfruits.com%2F&docid=-mnIn4oNcmfLnM&tbnid=Z6ZTokiagoD_HM%3A&vet=10ahUKEwikgZnNh7vZAhXCXrwKHWQvClIQMwgnKAAwAA..i&w=800&h=800&bih=949&biw=1920&q=%E6%9B%B4%E5%A4%9A&ved=0ahUKEwikgZnNh7vZAhXCXrwKHWQvClIQMwgnKAAwAA&iact=mrc&uact=8"></image>
              <text class="text">别人家的排行榜</text>
            </div>
            <div class="panel" v-for="(item,index) in rankList" :key="index" v-if="item.collapse" v-show="isShowMore">
              <image class="category-icon" :src="imageHost+item.cover"></image>
              <text class="text">{{item.title}}</text>
            </div>
            </template> -->
        <!-- </div> -->
        
    </scroller>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'
export default {
  name: 'fiction-view',
  components:{
    'view-header': viewHeader
  },
  data() {
    return {
      // epub: [],
      // male: [],
      // female: [],
      // picture: [],

      // isShowMore: false,

      rankTimeType: 1,
      ranking:null
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    bookList(){
      if(this.ranking){
        return this.ranking.books
      }
    }
    // rankList(){
    //   if(this.nowSex===1){
    //     return this.male
    //   } else if(this.nowSex===2){
    //     return this.female
    //   }
    // }
  },
  created() {
    this.getBookList()
  },
  methods: {
    changeRankType(value){
      this.rankTimeType = value
    },
    // getCollaspeLen(list) {
    //   let count = 0
    //   for (let item of list) {
    //     console.log(item.collapse)
    //     if (item.collapse) {
    //       count++
    //     }
    //   }
    //   return count
    // },
    getBookList() {
      console.log(this.$route)
      let rankId = this.$route.params.rankId
      console.log(rankId)
      this.request('/ranking/'+rankId, data => {
        if (data.ok) {
          console.log(data)
          this.ranking = data.ranking
        }
      })
    }
  }
}
</script>
<style scoped>
.scroller {
  height:1194px;
}
.tab-sex {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tab-sex-item {
  flex:1;
  /* border-right-width: 2px;
  border-right-color: #aaa;
  border-right-style: solid; */
  padding-top:20px;
  padding-bottom:20px;
}
/* .tab-sex-item:first-child {
  border-right-width: 2px;
  border-right-color: #aaa;
  border-right-style: solid;
} */
.select{
  border-bottom-width: 2px;
  border-bottom-color: #FF0000;
  border-bottom-style: solid;
}
.tab-sex-item-text{
  text-align: center;
  font-size:30px;
}
/* .cell {
}
.group-title {
  flex-direction: column;
  justify-content: center;
  height: 100px;
  padding-left: 15px;
}
.title-text {
  font-size: 45px;
  color: #666666;
  font-weight: 700;
}
.panel {
  height: 100px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #dddddd;
}
.category-icon {
  width: 45px;
  height: 45px;
}
.text {
  margin-left: 20px;
  font-size: 45px;
  color: #666666;
} */

.book-panel{
  flex-direction: row;
  align-items: center;
  height:240px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  border-bottom-width:2px;
  border-bottom-style:solid;
  border-bottom-color:#eee;
}
.book-img-panel{
  width:200px;
  margin-bottom:30px;
  margin-top:30px;
}
.book-img{
  width:180px;
  height:230px;
}
.book-desc{
  flex:1;
  height:230px;
  justify-content: flex-start;
}
.book-title{
  font-weight: 700;
  font-size:40px;
}
.book-author{
  font-size:30px;
  color:#aaa;
}
.book-short-info{
  lines:4;
  font-size:30px;
  color:#aaa;
}
</style>

