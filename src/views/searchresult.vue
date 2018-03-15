<template>
    <div>
      <view-header title="搜索结果" :isShowBack="true" @back="goback"></view-header>
      <scroller class="scroller" v-if="bookList.length">
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
      <!-- <div class="more-book-row" @click="loadMoreBook">
        <text class="more-book-text">更多书籍</text>
      </div> -->
    </scroller>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'
export default {
  name: 'search-result',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      bookList: []
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    searchKey() {
      let query = this.$route.query.query
      return query
    }
  },
  created() {
    this.search()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    search() {
      this.request(
        '/book/fuzzy-search' +
          this.translate({
            query: this.searchKey
          }),
        1,
        data => {
          if (data.ok) {
            this.bookList = data.books
          }
        },
        true
      )
    },
    // changeRankType(value) {
    //   this.rankTimeType = value
    //   this.bookList = []
    //   this.getBookList()
    // },
    // getBookList(index) {
    //   // console.log(this.rankId)
    //   // if (this.rankId) {
    //   let query = this.$route.query
    //   let gender = query.gender
    //   let type = query.type
    //   let major = query.major
    //   let minor = query.minor
    //   let start = index
    //   let limit = 10
    //   this.request(
    //     '/book/by-categories' +
    //       this.translate({
    //         gender: gender,
    //         type: type,
    //         major: major,
    //         minor: minor,
    //         start: start,
    //         limit: limit
    //       }),
    //     1,
    //     data => {
    //       if (data.ok) {
    //         // this.bookInfo = data
    //         data.books.forEach(item => {
    //           this.bookList.push(item)
    //         })
    //         // this.refreshBookList()
    //       }
    //     }
    //   )
    //   // }
    // },
    // loadMoreBook() {
    //   // this.len += 10
    //   this.getBookList(this.bookList.length - 1)
    //   // this.refreshBookList()
    // },
    // refreshBookList() {
    //   this.totalBooks.forEach((item, index) => {
    //     if (index >= this.len && index < this.len + 10) {
    //       this.bookList.push(item)
    //     }
    //   })
    //   this.len = this.bookList.length
    // },
    lookBookInfo(item) {
      this.jump({ name: 'bookinfo', query: { bookId: item._id } })
    }
  }
}
</script>
<style scoped>
.scroller {
  margin-top:120px;
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
.more-book-text {
  font-size: 30px;
}
</style>

