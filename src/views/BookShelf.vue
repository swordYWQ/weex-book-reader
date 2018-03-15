<template>
  <!-- <div> -->
    <scroller class="scroller" v-if="BookList.length>0">
      <!--默认九宫格布局-->
      <!-- <div class="box-list">
        <div class="box-list-item" v-for="(item,index) in BookList" :key="index" @click="readBook(item)">
          <image class="item-image" :src="imageHost+item.cover"></image>
          <text class="item-text" :line="2">{{item.title}}</text>
        </div>
      </div> -->
      <!--按行显示-->
      <list class="row-box-list">
        <cell v-for="(item,index) in BookList" :key="index" class="row-box-list-item" @click="readBook(item)" @longpress="showSelector(item)">
          <div class="row-book-img-panel">
            <image class="row-book-img" :src="imageHost+item.cover"></image>
          </div>
          <div class="row-book-desc">
            <text class="row-book-title">{{item.title}}</text>
            <text class="row-book-author">{{item.author}}</text>
            <text class="row-book-chapter">{{item.lastChapter}}</text>
          </div>
        </cell>
      </list>

      <book-selector v-if="isShowSelector" :bookInfo="selectBook" @delete="removeFromBookList" @close="closeSelector"></book-selector>
    </scroller>
    <div class="no-data-view" v-else>
        <text class="no-data-text">暂未添加书籍，快去书城中添加吧!</text>
      </div>
    <!-- </div> -->
</template>
<script>
import BookSelector from '../components/book-selector.vue'
export default {
  name: 'book-list',
  components:{
    'book-selector': BookSelector
  },
  data(){
    return {
      isShowSelector: false,
      selectBook: '',
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    BookList() {
      let bookList = this.$store.state.BookList
      return bookList
    }
  },
  created(){
    this.$store.dispatch('GET_BOOKLIST') // 初始化从本地获取书架列表
  },
  methods: {
    onrefresh (event) {
      this.refreshing = true

    },
    showSelector(item){
      // 显示书籍选项卡
      this.selectBook = item
      this.isShowSelector = true
    },
    closeSelector(){
      this.selectBook = null
      this.isShowSelector = false
    },
    removeFromBookList() {
      // 从书架中删除该书籍
      if (this.selectBook) {
        this.$store.dispatch('REMOVE_FROM_BOOKLIST', { _id: this.selectBook._id })
      }
      this.isShowSelector = false
      this.selectId = ""
    },
    readBook(item) {
      let bookId = item._id
      let bookTitle = item.title
      this.jump({ name: 'read', query: { bookId: bookId , bookTitle: bookTitle  } })
    }
  }
}
</script>
<style scoped>
.scroller {
}
.box-list {
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
.box-list-item {
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
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
  font-size: 30px;
}
.no-data-view {
  flex: 1;
  justify-content: center;
  align-items: center;
}
.no-data-text {
  text-align: center;
  font-size: 30px;
}

.row-box-list {
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
}
.row-box-list-item {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* height:230px; */
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  padding-right: 20px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #eee;
}
.row-box-list-item:active{
  background-color: #eee;
}
.row-book-img-panel {
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.row-book-img {
  width: 120px;
  height: 140px;
}
.row-book-desc {
  width: 630px;
  height: 140px;
  padding-left: 30px;
  justify-content: flex-start;
}
.row-book-title {
  font-weight: 700;
  font-size: 30px;
}
.row-book-author {
  font-size: 30px;
  color: #aaa;
}
.row-book-chapter {
  font-size: 30px;
  color: #aaa;
}
</style>
