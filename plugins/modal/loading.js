
import Modal from './modal'

const CONTENT_CLASS = 'content'
const MSG_CLASS = 'content-msg'
const LOADING = 'loading-image'

export default function Loading (config) {
  this.msg = config.message || ''
  Modal.call(this)
  this.node.classList.add('weex-loading')
}

Loading.prototype = Object.create(Modal.prototype)

Loading.prototype.createNodeContent = function () {
  const content = document.createElement('div')
  content.classList.add(CONTENT_CLASS)
  this.node.appendChild(content)

  const image = document.createElement('div')
  image.classList.add(LOADING)
  content.appendChild(image)

  const msg = document.createElement('div')
  msg.classList.add(MSG_CLASS)
  msg.appendChild(document.createTextNode(this.msg))
  content.appendChild(msg)
}
