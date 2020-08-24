export default class Slider {
  constructor () {
    this.wrapper = null
    this.items = null
    this.height = null
    this.currIdx = null
    this.isScroll = false

    this.wheelHandler = this.wheelHandler.bind(this)
    this.transitionendHandler = this.transitionendHandler.bind(this)
  }

  init (wrapper, startIdx = 0) {
    let items = wrapper.children
    let height = wrapper.clientHeight + 1
    for (let i = 0, max = items.length; i < max; i++) {
      let item = items[i]
      // 다음 아이템들
      if (i > startIdx) {
        item.style.transform = `translateY(${height}px)`
        continue
      }
      // 현재 아이템
      if (i === startIdx) {
        item.style.opacity = '1'
        continue
      }
      // 직전 아이템
      if (i === (startIdx - 1)) {
        item.style.opacity = '0.2'
        continue
      }
    }
    this.wrapper = wrapper
    this.items = items
    this.height = height
    this.currIdx = startIdx
    this.setHashname()
    this.wrapper.addEventListener('wheel', this.wheelHandler)
  }

  wheelHandler (event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.isScroll) return
    this.isScroll = true
    if (event.deltaY > 0) { this.wheelDown() }
    else if (event.deltaY < 0) { this.wheelUp() }
    this.setHashname()
  }

  wheelDown () {
    let currItem = this.items[this.currIdx]
    let prevItem = this.items[this.currIdx - 1]
    let nextItem = this.items[this.currIdx + 1]
    if (!nextItem) {
      this.isScroll = false
      return
    }
    if (prevItem) { prevItem.style.opacity = '0' }
    nextItem.addEventListener('transitionend', this.transitionendHandler)
    nextItem.style.transform = `translateY(0px)`
    nextItem.style.opacity = '1'
    currItem.style.opacity = '0.2'
    this.currIdx += 1
  }

  wheelUp () {
    let currItem = this.items[this.currIdx]
    let prevItem = this.items[this.currIdx - 2]
    let nextItem = this.items[this.currIdx - 1]
    if (!nextItem) {
      this.isScroll = false
      return
    }
    if (prevItem) { prevItem.style.opacity = '0.2' }
    nextItem.addEventListener('transitionend', this.transitionendHandler)
    nextItem.style.opacity = '1'
    currItem.style.transform = `translateY(${this.height}px)`
    currItem.style.opacity = '0'
    this.currIdx -= 1
  }

  transitionendHandler (event) {
    this.isScroll = false
    event.target.removeEventListener('transitionend', this.transitionendHandler)
  }

  setHashname () {
    let hashname = this.items[this.currIdx].dataset.hash
    window.location.replace(`#${hashname}`)
  }
}