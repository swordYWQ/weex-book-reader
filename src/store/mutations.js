// export function SET_ACTIVE_TYPE (state, { type }) {
//   state.activeType = type
// }

// export function SET_LIST (state, { type, ids }) {
//   state.lists[type] = ids
// }

// export function SET_ITEMS (state, { items }) {
//   items.forEach(item => {
//     if (item) {
//       Vue.set(state.items, item.id, item)
//     }
//   })
// }

// export function SET_USER (state, { user }) {
//   Vue.set(state.users, user.id, user)
// }


export function SET_ACTIVE_BAR_NAME(state, { name }) {
  state.activeBarName = name
}

export function SET_BOOKLIST(state, { booklist }) {
  state.BookList = booklist
}

export function SET_CHAPTERINFO(state, { chapterinfo }) {
  state.ChapterInfo = chapterinfo
}

export function SET_SETTINGCONFIG(state, { config }) {
  state.settingConfig = config
}

export function SET_MARKINFO(state, { markinfo }) {
  console.log('mutations:markinfo:',markinfo)
  state.markInfo = markinfo
}

export function SET_APICACHE(state, { apicache }) {
  state.ApiCache = apicache
}

export function showloading(state){
  state.loadingState = true
}
export function closeloading(state){
  state.loadingState = false
}