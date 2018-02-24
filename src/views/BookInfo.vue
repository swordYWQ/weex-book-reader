<template>
    <div>
      <view-header title="" :isShowBack="true" backName="findingview"></view-header>
      <scroller class="scroller">
      <div class="book-info">
        <div class="book-img-group">
          <image class="book-img"></image>
        </div>
        <div class="book-content">
          <div class="book-title"></div>
        </div>
      </div>
      </scroller>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'
export default {
  name: 'book-info',
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

      bookInfo:null
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
  margin-top:20px;
}
.book-img-panel{
  width:200px;
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
}
.book-author{
  font-size:30px;
}
.book-short-info{
  lines:3;
  font-size:30px;
}
</style>

