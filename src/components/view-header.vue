<template>
  <div class="header">
    <text class="goback-icon" @click="back" v-if="isShowBack">&#xe641;</text>
    <text class="header-title">{{title||'未定义'}}</text>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  height: 120px;
  line-height: 120px;
  margin-bottom: 3px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #dddddd;
  background-color: skyblue; /*#ff6600;*/
  padding: 25px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.goback-icon {
  font-family: iconfont1;
  font-size: 45px;
  color: #fff;
}
.header-title {
  text-align: center;
  font-size: 45px;
  color: #fff;
  flex: 1;
}
</style>
<script>
export default {
  name: 'view-header',
  props: {
    title: {
      type: String,
      default: () => {
        return '未定义'
      }
    },
    isShowBack: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    back() {
      if (this.isShowBack) {
        this.$emit('back')
      }
    }
  }
}
</script>
