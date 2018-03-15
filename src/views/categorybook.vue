<template>
    <div>
      <view-header :title="pageTitle||''" :isShowBack="true" @back="goback"></view-header>
      <list class="scroller" @loadmore="loadMoreBook">
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator-text">刷新中 ...</text>
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>
      <!-- <list> -->
        <cell v-if="bookList.length" v-for="(item,index) in bookList" :key="index" class="book-panel" @click="lookBookInfo(item)">
          <div class="book-img-panel">
            <image class="book-img" :src="imageHost+item.cover"></image>
          </div>
          <div class="book-desc">
            <text class="book-title">{{item.title}}</text>
            <text class="book-author">{{item.author}}</text>
            <text class="book-short-info">{{item.shortIntro}}</text>
          </div>
        </cell>
      <!-- </list> -->
      <!-- <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
          <text class="indicator-text">更多书籍 ...</text>
          <loading-indicator class="indicator"></loading-indicator>
        </loading> -->
      <!-- <div class="more-book-row" @click="loadMoreBook">
        <text class="more-book-text">更多书籍</text>
      </div> -->
        
    </list>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'
export default {
  name: 'category-book',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      rankTimeType: 1,

      len: 0, // 默认显示的书籍列表数量
      bookList: [],
      refreshing: false,
      loadinging: false
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    pageTitle() {
      return this.$route.query.major
    }
  },
  created() {
    this.getBookList(0,false)
  },
  methods: {
    goback() {
      this.$router.back()
    },
    getBookList(index,refresh) {
      let query = this.$route.query
      let gender = query.gender
      let type = query.type
      let major = query.major
      let minor = query.minor
      let start = index
      let limit = 10
      this.request(
        '/book/by-categories' +
          this.translate({
            gender: gender,
            type: type,
            major: major,
            minor: minor,
            start: start,
            limit: limit
          }),
        1,
        data => {
          if (data.ok) {
            // this.bookInfo = data
            data.books.forEach(item => {
              this.bookList.push(item)
            })
            this.refreshing = false
            this.loadinging = false
            // this.refreshBookList()
          }
        },
        refresh
      )
      // }
    },
     onrefresh (event) {
        this.refreshing = true
        this.bookList = []
        this.getBookList(0,true)
      },
     onloading (event) {
        this.loadinging = true
        this.loadMoreBook()
      },
    loadMoreBook() {
      this.getBookList(this.bookList.length - 1,false)
    },
    lookBookInfo(item) {
      this.jump({ name: 'bookinfo', query: { bookId: item._id } })
    }
  }
}
</script>
<style scoped>
.scroller {
  height: 1194px;
  margin-top:120px;
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
.more-book-text{
  font-size: 30px;
}

.indicator-text{
  text-align: center;
  font-size: 30px;
  color: #aaa;
}
</style>

