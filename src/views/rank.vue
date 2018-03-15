<template>
    <div>
      <view-header title="排行榜" :isShowBack="true" @back="goback"></view-header>
      <scroller class="scroller">
      <div class="tab-sex">
        <div class="tab-sex-item" :class="[nowSex===1?'select':'']" @click="changeSex(1)">
        <text class="tab-sex-item-text">男生</text>
        </div>
        <div class="tab-sex-item" :class="[nowSex===2?'select':'']" @click="changeSex(2)">
        <text class="tab-sex-item-text" >女生</text>
         </div>
         <div class="tab-sex-item" :class="[nowSex===3?'select':'']" @click="changeSex(3)">
        <text class="tab-sex-item-text" >漫画</text>
         </div>
         <div class="tab-sex-item" :class="[nowSex===4?'select':'']" @click="changeSex(4)">
        <text class="tab-sex-item-text" >其他</text>
         </div>
      </div>
        <div class="cell">
          <div class="panel" v-for="(item,index) in rankList" :key="index" v-if="!item.collapse" @click="goBookList(item)">
            <image class="category-icon" :src="imageHost+item.cover"></image>
            <text class="text">{{item.title}}</text>
          </div>
          <template v-if="getCollaspeLen(rankList)">
            <div class="panel" @click="isShowMore=!isShowMore">
              <!-- <image class="category-icon" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fvanfruits.com%2Fstatic%2Fimages%2Fmore-products-1.jpg&imgrefurl=https%3A%2F%2Fwww.vanfruits.com%2F&docid=-mnIn4oNcmfLnM&tbnid=Z6ZTokiagoD_HM%3A&vet=10ahUKEwikgZnNh7vZAhXCXrwKHWQvClIQMwgnKAAwAA..i&w=800&h=800&bih=949&biw=1920&q=%E6%9B%B4%E5%A4%9A&ved=0ahUKEwikgZnNh7vZAhXCXrwKHWQvClIQMwgnKAAwAA&iact=mrc&uact=8"></image> -->
              <text class="text">别人家的排行榜</text>
            </div>
            <div class="panel" v-for="(item,index) in rankList" :key="index" v-if="item.collapse&&isShowMore">
              <image class="category-icon" :src="imageHost+item.cover"></image>
              <text class="text">{{item.title}}</text>
            </div>
            </template>
        </div>
        
    </scroller>
    </div>
</template>
<script>
// var stream = weex.requireModule('stream')
import viewHeader from '../components/view-header.vue'

export default {
  name: 'rank',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      epub: [],
      male: [],
      female: [],
      picture: [],

      isShowMore: false,

      nowSex: 1 // 性别 1为男 2为女 3为漫画 4为其他
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    },
    rankList() {
      if (this.nowSex === 1) {
        return this.male
      } else if (this.nowSex === 2) {
        return this.female
      } else  if (this.nowSex === 3) {
        return this.picture
      } else  if (this.nowSex === 4) {
        return this.epub
      } 
    }
  },
  created() {
    this.getRankType()
  },
  methods: {
    goback(){
      this.$store.commit('SET_ACTIVE_BAR_NAME', { name: 'find' })
      // this.jump({ name: 'findingview' })
      this.$router.back()
    },
    changeSex(value) {
      this.nowSex = value
    },
    getCollaspeLen(list) {
      let count = 0
      for (let item of list) {
        console.log(item.collapse)
        if (item.collapse) {
          count++
        }
      }
      return count
    },
    getRankType() {
      this.request('/ranking/gender',1, data => {
        if (data.ok) {
          this.epub = data.epub || []
          this.male = data.male || []
          this.female = data.female || []
          this.picture = data.picture || []
        }
      })
    },
    goBookList(item) {
      this.jump({
        name: 'booklist',
        query: {
          week: item._id,
          month: item.monthRank,
          total: item.totalRank
        }
      })
    }
  }
}
</script>
<style scoped>
.scroller {
  /* height:calc(100% - 240px); */
  margin-top: 120px;
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
.cell {
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
}
</style>

