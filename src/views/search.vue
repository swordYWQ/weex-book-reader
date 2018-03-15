<template>
  <div>
    <view-header title="搜索" :isShowBack="true" @back="goback"></view-header>
    <div class="search-page">
      <div class="search-group">
      <input type="text" placeholder="请输入小说名" v-model="searchKey" class="search-input"/>
      <div class="search-btn" @click="search"><text class="search-btn-text">搜索</text></div>
      </div>
      <scroller class="keywords-scroller">
        <list class="auto-keywords-list">
         <cell class="auto-keywords-cell" v-for="(item,index) in keywords" :key="index" @click="selectKeyword(item)">
           <text class="keywords-text">{{item}}</text>
         </cell>
        </list>
      </scroller>
    </div>
  </div>
</template>
<script>
import viewHeader from '../components/view-header.vue'
export default {
  name: 'search',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      searchKey: '',
      keywords: []
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    getKeywords() {
      this.request(
        '/book/auto-complete' + this.translate({ query: this.searchKey }),
        1,
        data => {
          if (data.ok) {
            this.keywords = data.keywords
          }
        },
        true
      )
    },
    selectKeyword(item) {
      this.searchKey = item
    },
    search() {
      if(this.searchKey){
        this.jump({ name: 'searchresult', query: { query: this.searchKey } })
      }
    }
  },
  watch: {
    searchKey(v, ov) {
      if (v != ov) {
        this.getKeywords()
      }
    }
  }
}
</script>
<style scoped>
.search-page {
  margin-top:120px;
}
.search-group {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-btn {
  width: 100px;
}
.search-btn-text {
  font-size: 40px;
  color: skyblue;
}
.search-input {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  /* padding-left: 40px; */
  text-align: center;
  border-style: solid;
  border-width: 2px;
  border-color: #ddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.keywords-scroller {
  height: 1134px;
}
.auto-keywords-list {
}
.auto-keywords-cell {
  line-height: 80px;
  border-style: solid;
  border-bottom-width: 2px;
  border-color: #ddd;
}
.keywords-text {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  font-size: 40px;
  color: #333;
}
.auto-keywords-cell:active {
  background-color: #eee;
}
</style>
