export const imgError = {
  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value
    }
  }
}

export const aaaa = {
  inserted: function () {}
}

export const bbb = {
  inserted: function () {}
}
