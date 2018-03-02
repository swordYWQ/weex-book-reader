// import Vue from 'vue'
import VueRouter from 'vue-router'
// import StoriesView from './views/StoriesView.vue'
// import ArticleView from './views/ArticleView.vue'
// import CommentView from './views/CommentView.vue'
// import UserView from './views/UserView.vue'

import HomeView from './views/home.vue'
import BookShelf from './views/bookshelf.vue'
import FindingView from './views/find.vue'
import RankingView from './views/rank.vue'
import MineView from './views/mine.vue'
import FictionView from './views/booklist.vue'
import BookInfo from './views/bookinfo.vue'
import ReadingView from './views/read.vue'
import CategoryView from './views/category.vue'
import CategoryBook from './views/categorybook.vue'
import About from './views/about.vue'

Vue.use(VueRouter)

// Story view factory
// function createStoriesView (type) {
//   return {
//     name: `${type}-stories-view`,
//     render (createElement) {
//       return createElement(StoriesView, { props: { type }})
//     }
//   }
// }

export default new VueRouter({
  // mode: 'abstract',
  routes: [
    {
      path: '/home', name: 'home', component: HomeView, children: [
        { path: '/home/bookshelf', name: 'bookshelf', component: BookShelf },
        { path: '/home/find', name: 'find', component: FindingView },
        { path: '/home/mine', name: 'mine', component: MineView },
      ]
    },
    { path: '/rank', name: 'rank', component: RankingView },
    { path: '/booklist', name: 'booklist', component: FictionView },
    { path: '/category', name: 'category', component: CategoryView },
    { path: '/categorybook', name: 'categorybook', component: CategoryBook },
    { path: '/bookinfo', name: 'bookinfo', component: BookInfo },
    { path: '/read', name: 'read', component: ReadingView },
    { path: '/about', name: 'about', component: About },
    // { path: '/top', component: createStoriesView('top') },
    // { path: '/new', component: createStoriesView('new') },
    // { path: '/show', component: createStoriesView('show') },
    // { path: '/ask', component: createStoriesView('ask') },
    // { path: '/job', component: createStoriesView('job') },
    // { path: '/article/:url(.*)?', component: ArticleView },
    // { path: '/item/:id(\\d+)', component: CommentView },
    // { path: '/user/:id', component: UserView },
    { path: '/', redirect: { name: 'bookshelf' } }
  ]
})
