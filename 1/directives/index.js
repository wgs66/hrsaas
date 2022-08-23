import store from '@/store'
// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到Dom中时
  inserted: function (el, { value }) {
    // 监听dom img图片加载是吧事件
    if (!el.src) {
      // console.log(el.src)
      // console.log(value)
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}

export const isHas = {
  // bind 指令和dom绑定
  // inserted 指令所绑定的元素插入到父节点
  // update 指令绑定的Vnode
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
