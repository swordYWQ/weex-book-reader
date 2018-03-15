<template>
    <div v-if="bookInfo">
      <view-header :title="bookInfo.title" :isShowBack="true" @back="goback"></view-header>
      <scroller class="scroller">
      <div class="book-info">
        <div class="book-img-panel">
          <image class="book-img" :src="imageHost+bookInfo.cover"></image>
        </div>
        <div class="book-content">
          <text class="book-title">{{bookInfo.title}}</text>
          <text class="book-author">{{bookInfo.author}} | {{bookInfo.cat}} | {{bookInfo.isSerial?'连载中':'已完结'}}</text>
          <text class="book-count">总字数:{{bookInfo.wordCount}}</text>
          <text class="book-updated">最近更新:{{formatDateTime(bookInfo.updated)}}</text>
          <text class="book-chapter">{{bookInfo.lastChapter}}</text>
        </div>
      </div>
      <div class="book-long-intro">
        <text class="book-desc-title">书籍简介</text>
        <text class="book-long-desc">{{bookInfo.longIntro}}</text>
      </div>
      <div class="book-btn-group">
        <div class="btn-item" @click="addToBookList" v-if="!isInBookList">
          <text class="btn-text">添加到书架</text>
        </div>
        <div class="btn-item bg-gray" @click="removeFromBookList" v-else>
          <text class="btn-text">不追了</text>
        </div>
        <div class="btn-item" @click="readBook">
          <text class="btn-text">开始阅读</text>
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
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      bookInfo: null
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    BookList() {
      return this.$store.state.BookList
    },
    isInBookList() {
      if (this.bookInfo) {
        for (let i = 0; i < this.BookList.length; i++) {
          let item = this.BookList[i]
          if (item._id === this.bookInfo._id) {
            return true
          }
        }
      }
      return false
    }
  },
  created() {
    this.getBookInfo()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    formatDateTime(datetime) {
      return this.moment(datetime).format('YYYY-MM-DD HH:mm:ss') || ''
    },
    getBookInfo() {
      let bookId = this.$route.query.bookId
      this.request('/book/' + bookId, 1, data => {
        this.bookInfo = data
      })
    },
    addToBookList() {
      // 添加到书架
      if (this.bookInfo) {
        let book = this.bookInfo
        this.$store.dispatch('ADD_TO_BOOKLIST', { book })
      }
    },
    removeFromBookList() {
      // 从书架中删除该书籍
      if (this.bookInfo) {
        this.$store.dispatch('REMOVE_FROM_BOOKLIST', { _id: this.bookInfo._id })
      }
    },
    readBook() {
      if (this.bookInfo) {
        this.jump({
          name: 'read',
          query: {
            bookId: this.bookInfo._id,
            bookTitle: this.bookInfo.title
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.scroller {
  height: 1194px;
  margin-top:120px;
}
.book-info {
  flex-direction: row;
  align-items: center;
  height: 240px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #eee;
  margin-top: 20px;
}
.book-img-panel {
  width: 200px;
}
.book-img {
  width: 180px;
  height: 230px;
}
.book-content {
  flex: 1;
  height: 230px;
  justify-content: flex-start;
}
.book-title {
  font-size: 40px;
  font-weight: 700;
}
.book-author {
  font-size: 30px;
  color: #aaa;
}
.book-count {
  font-size: 30px;
  color: #aaa;
}
.book-updated {
  font-size: 30px;
  color: #aaa;
}
.book-chapter {
  font-size: 30px;
  color: #aaa;
}
.book-long-intro {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 30px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #eee;
  color: #aaa;
}
.book-desc-title {
  font-size: 30px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
}
.book-long-desc {
  font-size: 30px;
  color: #aaa;
}

.book-btn-group {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.btn-item {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: skyblue;
}
.bg-gray {
  background-color: gray;
}
.btn-text {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  text-align: center;
}
</style>

