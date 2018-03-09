// import { fetchItems, fetchIdsByType, fetchUser } from './fetch'

// const LOAD_MORE_STEP = 10

// // ensure data for rendering given list type
// export function FETCH_LIST_DATA ({ commit, dispatch, state }, { type }) {
//   commit('SET_ACTIVE_TYPE', { type })
//   return fetchIdsByType(type)
//     .then(ids => commit('SET_LIST', { type, ids }))
//     .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
// }

// // load more items
// export function LOAD_MORE_ITEMS ({ dispatch, state }) {
//   state.counts[state.activeType] += LOAD_MORE_STEP
//   return dispatch('ENSURE_ACTIVE_ITEMS')
// }

// // ensure all active items are fetched
// export function ENSURE_ACTIVE_ITEMS ({ dispatch, getters }) {
//   return dispatch('FETCH_ITEMS', {
//     ids: getters.activeIds
//   })
// }

// export function FETCH_ITEMS ({ commit, state }, { ids }) {
//   // only fetch items that we don't already have.
//   const newIds = ids.filter(id => !state.items[id])
//   return newIds.length
//     ? fetchItems(newIds).then(items => commit('SET_ITEMS', { items }))
//     : Promise.resolve()
// }

// export function FETCH_USER ({ commit, state }, { id }) {
//   return state.users[id]
//     ? Promise.resolve(state.users[id])
//     : fetchUser(id).then(user => commit('SET_USER', { user }))
// }
var storage = weex.requireModule('storage')
var modal = weex.requireModule('modal')

import defaultSetting from '../config/setting.js';

// 获取书架
export function GET_BOOKLIST({ commit }) {
  storage.getItem('BOOKLIST', (e) => {
    if (e.data === 'undefined') {
      storage.setItem('BOOKLIST', '[]')
    }
    let booklist = e.data && e.data !== 'undefined' ? JSON.parse(e.data) : []
    commit('SET_BOOKLIST', { booklist } || [])
  })
}
// 添加到书架
export function ADD_TO_BOOKLIST({ state, dispatch }, { book }) {
  let list = state.BookList
  list.push(book)
  storage.setItem('BOOKLIST', JSON.stringify(list), (e) => {
    if (e.result === 'success') {
      dispatch('GET_BOOKLIST')
      modal.toast({
        message: '添加成功!',
        duration: 1
      })
    } else {
      modal.toast({
        message: '添加失败!',
        duration: 1
      })
    }
  })
}
// 从书架移除
export function REMOVE_FROM_BOOKLIST({ state, dispatch }, { _id }) {
  let list = state.BookList
  for (let i = 0; i < list.length; i++) {
    if (list[i]._id === _id) {
      list.splice(i, 1)
      break
    }
  }
  storage.setItem('BOOKLIST', list, (e) => {
    if (e.result === 'success') {
      dispatch('GET_BOOKLIST')
      modal.toast({
        message: '移除成功!',
        duration: 1
      })
    } else {
      modal.toast({
        message: '移除失败!',
        duration: 1
      })
    }
  })
}


// 获取本地章节信息
export function GET_CHAPTERINFO({ state, commit }) {
  storage.getItem('CHAPTERINFO', (e) => {
    if (e.data === 'undefined') {
      storage.setItem('CHAPTERINFO', '[]')
    }
    let chapterinfo = e.data && e.data !== 'undefined' ? JSON.parse(e.data) : []
    commit('SET_CHAPTERINFO', { chapterinfo } || [])
  })
}

export function SET_CHAPTERINFO({ state, dispatch }, { info }) {
  let list = state.ChapterInfo
  list.push(info)
  storage.setItem('CHAPTERINFO', JSON.stringify(list), (e) => {
    if (e.result === 'success') {
      dispatch('GET_CHAPTERINFO')
    }
  })
}

export function GET_SETTINGCONFIG({ commit }) {
  storage.getItem('SETTINGCONFIG', (e) => {
    if (e.data === 'undefined') {
      storage.setItem('SETTINGCONFIG', JSON.stringify(defaultSetting))
    }
    let config = e.data && e.data !== 'undefined' ? JSON.parse(e.data) : []
    commit('SET_SETTINGCONFIG', { config } || [])
  })
}
export function SET_SETTINGCONFIG({ state, dispatch }, config) {
  storage.setItem('SETTINGCONFIG', JSON.stringify(config), (e) => {
    if (e.result === 'success') {
      dispatch('GET_SETTINGCONFIG')
    }
  })
}
// 获取缓存书签
export function GET_MARKINFO({ commit }) {
  storage.getItem('MARKINFO', (e) => {
    if (e.data === 'undefined') {
      storage.setItem('MARKINFO', '{}')
    }
    let markinfo = e.data && e.data !== 'undefined' ? JSON.parse(e.data) : []
    commit('SET_MARKINFO', { markinfo } || {})
  })
}
// 设置书签
export function SET_MARKINFO({ state, dispatch }, { bookId, markinfo }) {
  let list = state.markInfo
  list[bookId] = markinfo
  // list.push(markinfo)
  storage.setItem('MARKINFO', JSON.stringify(list), (e) => {
    if (e.result === 'success') {
      dispatch('GET_MARKINFO')
    }
  })
}

// 获取api缓存数据
export function getApiCache({ commit }) {
  storage.getItem('APICACHE', (e) => {
    if (e.data === 'undefined') {
      storage.setItem('APICACHE', '{}')
    }
    let apicache = e.data && e.data !== 'undefined' ? JSON.parse(e.data) : []
    commit('SET_APICACHE', { apicache } || [])
  })
}
// 设置api缓存
export function setApiCache({ dispatch, state }, { api, result }) {
  let list = state.ApiCache
  list[api] = result
  storage.setItem('APICACHE', JSON.stringify(list), (e) => {
    if (e.result === 'success') {
      dispatch('getApiCache')
    }
  })
}

// 清理本地缓存
export function clearStorage({ dispatch }) {
  // // 清理章节缓存
  // storage.setItem('CHAPTERINFO', '[]', (e) => {
  //   if (e.result === 'success') {
  //     dispatch('GET_CHAPTERINFO')
  //     modal.toast({
  //       message: '清理缓存成功!',
  //       duration: 1
  //     })
  //   }
  // })
  storage.setItem('SETTINGCONFIG',  JSON.stringify(defaultSetting), (e) => {
    if (e.result === 'success') {
      dispatch('GET_SETTINGCONFIG')
      modal.toast({
        message: '清理设置缓存成功!',
        duration: 1
      })
    }
  })
  storage.setItem('MARKINFO', '{}', (e) => {
    if (e.result === 'success') {
      dispatch('GET_MARKINFO')
      modal.toast({
        message: '清理书签缓存成功!',
        duration: 1
      })
    }
  })
  // 清理api缓存
  storage.setItem('APICACHE', '{}', (e) => {
    if (e.result === 'success') {
      dispatch('getApiCache')
      modal.toast({
        message: '清理API缓存成功!',
        duration: 1
      })
    }
  })
}