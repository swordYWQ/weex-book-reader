<template>
    <scroller class="scroller">
        <list class="cell" >
          <cell class="search-group" @click="search">
            <div class="search-input">
              <text class="text search-text">请输入小说名</text>
            </div>
          </cell>
          <cell class="panel" v-for="(item,index) in findingList" :key="index" @click="lookDetail(item.name)">
            <!-- <image class="category-icon" :src=""></image> -->
            <text class="text">{{item.content}}</text>
          </cell>
        </list>
    </scroller>
</template>
<script>
// var stream = weex.requireModule('stream')
export default {
  name: 'findings',
  data() {
    return {
      findingList: [
        {
          content: '排行榜',
          name: 'rank'
        },
        {
          content: '分类',
          name: 'category'
        }
      ]
    }
  },
  computed: {
    imageHost() {
      return this.$store.state.imageHost
    }
  },
  // created() {
  // this.getRankType()
  // },
  methods: {
    search() {
      this.jump({ name: 'search' })
    },
    lookDetail(name) {
      // console.log(name)
      this.jump({ name: name })
    }
    // getRankType() {
    //   this.$fetch('/ranking/gender', data => {
    //     console.log(data)
    //     if (data.ok) {
    //       this.epub = data.epub || []
    //       this.male = data.male || []
    //       this.female = data.female || []
    //       this.picture = data.picture || []
    //     }
    //   })
    // }
  }
}
</script>
<style scoped>
.scroller {
  /* height:calc(100% - 240px); */
}
.cell {
}
.search-group {
  /* flex:1; */
  /* height: 100px; */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.search-input {
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;
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
.search-btn-text {
  font-size: 30px;
  text-align: center;
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
.text{
  margin-left: 20px;
  font-size: 45px;
  text-align: center;
}
.search-text {
  margin-left: 20px;
  font-size: 30px;
  text-align: center;
  color: #666666;
}
</style>

