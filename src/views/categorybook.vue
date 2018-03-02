<template>
    <div v-if="bookInfo">
      <view-header :title="pageTitle||''" :isShowBack="true" @back="goback"></view-header>
      <scroller class="scroller">
      <!-- <div class="tab-sex">
        <div class="tab-sex-item" :class="[rankTimeType===1?'select':'']" @click="changeRankType(1)">
        <text class="tab-sex-item-text">周榜</text>
        </div>
        <div class="tab-sex-item" :class="[rankTimeType===2?'select':'']" @click="changeRankType(2)">
        <text class="tab-sex-item-text" >月榜</text>
         </div>
         <div class="tab-sex-item" :class="[rankTimeType===3?'select':'']" @click="changeRankType(3)">
        <text class="tab-sex-item-text" >总榜</text>
         </div>
      </div> -->
      <list>
        <cell v-for="(item,index) in bookList" :key="index" class="book-panel" @click="lookBookInfo(item)">
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
      <div class="more-book-row" @click="loadMoreBook">
        <text class="more-book-text">更多书籍</text>
      </div>
        
    </scroller>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'
export default {
  name: 'book-list',
  components: {
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
      bookInfo: null,

      len: 0, // 默认显示的书籍列表数量
      bookList: []
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    // rankId() {
    //   let route = this.$route
    //   if (this.rankTimeType === 1) {
    //     //周榜
    //     return route.query.week
    //   } else if (this.rankTimeType === 2) {
    //     //月榜
    //     return route.query.month
    //   } else if (this.rankTimeType === 3) {
    //     //总榜
    //     return route.query.total
    //   }
    //   return ''
    // },
    pageTitle(){
      return this.$route.query.major
    },
    totalBooks() {
      if (this.bookInfo) {
        return this.bookInfo.books
      }
      return []
    }
  },
  created() {
    this.getBookList()
  },
  methods: {
    goback(){
      this.$router.back()
    },
    // changeRankType(value) {
    //   this.rankTimeType = value
    //   this.bookList = []
    //   this.getBookList()
    // },
    getBookList() {
      // console.log(this.rankId)
      // if (this.rankId) {
        let query = this.$route.query
        let gender = query.gender
        let type = query.type
        let major = query.major
        let minor = query.minor
        let start  = 0
        let limit = 20
        this.request('/book/by-categories' + this.translate({
          gender:gender,
          type:type,
          major:major,
          minor:minor,
          start:start,
          limit:limit
        }),1, data => {
          if (data.ok) {
            this.bookInfo = data
            this.refreshBookList()
          }
        })
      // }
    },
    loadMoreBook() {
      // this.len += 10
      this.refreshBookList()
    },
    refreshBookList() {
      this.totalBooks.forEach((item, index) => {
        if (index >= this.len && index < this.len + 10) {
          this.bookList.push(item)
        }
      })
      this.len = this.bookList.length
    },
    lookBookInfo(item){
      this.jump({name:'bookinfo',query:{bookId:item._id}})
    }
  }
}
</script>
<style scoped>
.scroller {
  height: 1194px;
}
.tab-sex {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tab-sex-item {
  flex: 1;
  /* border-right-width: 2px;
  border-right-color: #aaa;
  border-right-style: solid; */
  padding-top: 20px;
  padding-bottom: 20px;
}
/* .tab-sex-item:first-child {
  border-right-width: 2px;
  border-right-color: #aaa;
  border-right-style: solid;
} */
.select {
  border-bottom-width: 2px;
  border-bottom-color: #ff0000;
  border-bottom-style: solid;
}
.tab-sex-item-text {
  text-align: center;
  font-size: 30px;
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

.book-panel {
  flex-direction: row;
  align-items: center;
  /* height:220px; */
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #eee;
}
.book-img-panel {
  width: 200px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.book-img {
  width: 180px;
  height: 220px;
}
.book-desc {
  flex: 1;
  height: 220px;
  justify-content: flex-start;
}
.book-title {
  font-weight: 700;
  font-size: 30px;
}
.book-author {
  font-size: 30px;
  color: #aaa;
}
.book-short-info {
  lines: 3;
  font-size: 30px;
  color: #aaa;
}
.more-book-row {
  height: 80px;
  justify-content: center;
  align-items: center;
}
</style>

