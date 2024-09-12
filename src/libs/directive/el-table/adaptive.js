// noinspection JSUnresolvedVariable

import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const doResize = (el, binding, vNode) => {
  const { componentInstance: $table } = vNode
  const { value } = binding
  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`)
  }
  const bottomOffset = (value && value.bottomOffset) || 30
  if (!$table) return
  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  $table.layout.setHeight(height)
  $table.doLayout()
}

export default {
  bind(el, binding, vNode) {
    el.resizeListener = () => {
      doResize(el, binding, vNode)
    }
    addResizeListener(window.document.body, el.resizeListener)
  },
  inserted(el, binding, vNode) {
    doResize(el, binding, vNode)
  },
  unbind(el) {
    removeResizeListener(window.document.body, el.resizeListener)
  }
}
