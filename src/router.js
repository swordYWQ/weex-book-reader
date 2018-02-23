// import Vue from 'vue'
import Router from 'vue-router'
import StoriesView from './views/StoriesView.vue'
import ArticleView from './views/ArticleView.vue'
import CommentView from './views/CommentView.vue'
import UserView from './views/UserView.vue'

import HomeView from './views/HomeView.vue'
import BookShelf from './views/BookShelf.vue'
import FindingView from './views/FindingView.vue'
import RankingView from './views/RankingView.vue'
import MineView from './views/MineView.vue'

Vue.use(Router)

// Story view factory
function createStoriesView (type) {
  return {
    name: `${type}-stories-view`,
    render (createElement) {
      return createElement(StoriesView, { props: { type }})
    }
  }
}

export default new Router({
  // mode: 'abstract',
  routes: [
    { path: '/home', name:'home', component: HomeView, children:[
      {path:'bookshelf',name:'bookshelf',component: BookShelf},
      {path:'findingview',name:'findingview',component: FindingView},
      {path:'mineview',name:'mineview',component: MineView},
    ] },
    {path:'rankingview',name:'rankingview',component: RankingView},
    
    { path: '/top', component: createStoriesView('top') },
    { path: '/new', component: createStoriesView('new') },
    { path: '/show', component: createStoriesView('show') },
    { path: '/ask', component: createStoriesView('ask') },
    { path: '/job', component: createStoriesView('job') },
    { path: '/article/:url(.*)?', component: ArticleView },
    { path: '/item/:id(\\d+)', component: CommentView },
    { path: '/user/:id', component: UserView },
    { path: '/', redirect: {name:'bookshelf'} }
  ]
})
