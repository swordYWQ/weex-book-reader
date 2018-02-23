<template>
    <div :class="['wrapper']">
        <div class="bar-item" @click="tabTo(item.name)" v-for="(item,index) in list" :key="index">
            <text class="bar-ic title-icon" :class="[isActive(item.name)]">{{item.icon}}</text>
            <text class="bar-txt" :class="[isActive(item.name)]">{{item.content}}</text>
        </div>

        <!-- <div class="bar-item" @click="tabTo('bookshelf')">
            <text class="bar-ic title-icon" :class="[this.isActive('bookshelf')]">&#xe67c;</text>
            <text class="bar-txt" :class="[this.isActive('bookshelf')]">书架</text>
        </div>
        <div class="bar-item" @click="tabTo('category')">
            <text class="bar-ic title-icon" :class="[this.pIndexKey == 'category'?'bar-active':'']">&#xe61d;</text>
            <text class="bar-txt" :class="[this.pIndexKey == 'category'?'bar-active':'']">分类</text>
            <text class="notice-dot"></text>
        </div>
        <div class="bar-item" @click="tabTo('mineview')">
            <text class="bar-ic title-icon" :class="[this.isActive('mineview')]">&#xe611;</text>
            <text class="bar-txt" :class="[this.isActive('mineview')]">我的</text>
        </div> -->
    </div>
</template>
<style scoped>
.title-icon {
  font-family: iconfont1;
}
.wrapper {
  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0; */
  height: 120px;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #d9d9d9;
  background-color: #fafafa;
}
/* .w-ipx {
  height: 140px;
} */
.bar-item {
  flex: 1;
}
.bar-txt,
.bar-ic {
  color: #666;
  text-align: center;
}
.bar-active {
  color: #b4282d;
}
.bar-ic {
  padding-top: 14px;
  font-size: 38px;
}
.bar-txt {
  font-size: 22px;
  padding-top: 2px;
}
.i-notice {
  position: absolute;
  top: 10px;
  right: 30px;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: #f00;
}
.notice-dot {
  position: absolute;
  top: 15px;
  right: 80px;
  height: 15px;
  width: 15px;
  border-radius: 100%;
  background-color: #f00;
}
</style>
<script>
var modal = weex.requireModule('modal')
var he = require('he')
export default {
  computed: {},
  props:{
    activeName:{
      type:String
    },
    list:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      // pIndexKey: 'home'
    }
  },
  //  created(){
    
  // },
  mounted() {},
  methods: {
    getFontName: function(fontName) {
      console.log(he.decode(fontName))
      return he.decode(fontName)
    },
    isActive: function(_c) {
      return this.activeName === _c ? 'bar-active' : ''
    },
    tabTo(_key) {
      if (this.activeName === _key) return
      // this.pIndexKey = _key
      this.$emit('tabTo', _key)
    }
  }
}
</script>