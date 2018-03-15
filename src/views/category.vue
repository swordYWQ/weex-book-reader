<template>
  <div>
    <view-header title="分类" :isShowBack="true" @back="goback"></view-header>
    <scroller class="scroller" :style="{height:deviceHeight-60+'px'}">
      <div class="category-group" v-if="male">
      <div class="category-type">
        <text class="category-type-text">男生</text>
      </div>
      <div class="category-list">
        <div class="list-box" v-for="(item,index) in male" :key="index" @click="goBookList(item,'male')">
          <text class="box-title">{{item.name}}</text>
          <text class="box-count">{{item.bookCount}}本</text>
        </div>
      </div>
    </div>
    <div class="category-group">
      <div class="category-type">
        <text class="category-type-text">女生</text>
      </div>
      <div class="category-list">
         <div class="list-box" v-for="(item,index) in female" :key="index" @click="goBookList(item,'female')">
          <text class="box-title">{{item.name}}</text>
          <text class="box-count">{{item.bookCount}}本</text>
        </div>
      </div>
      </div>
      <div class="category-group">
      <div class="category-type">
        <text class="category-type-text">漫画</text>
      </div>
      <div class="category-list">
         <div class="list-box" v-for="(item,index) in picture" :key="index" @click="goBookList(item,'press')">
          <text class="box-title">{{item.name}}</text>
          <text class="box-count">{{item.bookCount}}本</text>
        </div>
      </div>
      </div>
      <div class="category-group">
      <div class="category-type">
        <text class="category-type-text">出版</text>
      </div>
      <div class="category-list">
         <div class="list-box" v-for="(item,index) in press" :key="index" @click="goBookList(item,'press')">
          <text class="box-title">{{item.name}}</text>
          <text class="box-count">{{item.bookCount}}本</text>
        </div>
      </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import viewHeader from '../components/view-header.vue'
export default {
  name: 'category',
  data() {
    return {
      categoryInfo: null,

      deviceHeight: 0
    }
  },
  components: {
    'view-header': viewHeader
  },
  computed: {
    male() {
      return this.categoryInfo ? this.categoryInfo.male : []
    },
    female() {
      return this.categoryInfo ? this.categoryInfo.female : []
    },
    picture() {
      return this.categoryInfo ? this.categoryInfo.picture : []
    },
    press() {
      return this.categoryInfo ? this.categoryInfo.press : []
    }
  },
  created() {
    let env = weex.config.env
    this.deviceHeight = env.deviceHeight * env.scale
    this.getCategoryInfo()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    getCategoryInfo() {
      this.request(
        '/cats/lv2/statistics',
        1,
        data => {
          if (data.ok) {
            this.categoryInfo = data
          }
        },
        false
      )
    },
    goBookList(item, gender) {
      this.jump({
        name: 'categorybook',
        query: {
          gender: gender,
          type: 'hot',
          major: item.name,
          minor: ''
        }
      })
    }
  }
}
</script>
<style scoped>
.category-view {
}

.scroller {
  /* height: 1212px; */
  margin-top: 120px;
}
.category-group {
}
.category-type {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.category-type-text {
  font-weight: 700;
  font-size: 35px;
}
.category-list {
  flex-direction: row;
  flex-wrap: wrap;
}
.list-box {
  width: 250px;
  height: 150px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.box-title {
  font-size: 35px;
}
.box-count {
  font-size: 35px;
  color: #bbb;
}
</style>