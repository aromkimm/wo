export function magnify (img, glass) {
  let w,
      h,
      bw = 3,
      zoom = 2

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = `url('${img.src}')`
  glass.style.backgroundRepeat = `no-repeat`
  glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`
  w = glass.offsetWidth / 2
  h = glass.offsetHeight / 2

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener('mousemove', moveMagnifier)
  img.addEventListener('mousemove', moveMagnifier)

  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier)
  img.addEventListener('touchmove', moveMagnifier)

  function moveMagnifier (e) {
    let pos, x, y
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault()
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e)
    x = pos.x
    y = pos.y
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom
    }
    if (x < w / zoom) {
      x = w / zoom
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom
    }
    if (y < h / zoom) {
      y = h / zoom
    }
    /* Set the position of the magnifier glass: */
    glass.style.left = `${x - w}px`
    glass.style.top = `${y - h}px`
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
      y * zoom - h + bw
    }px`
  }

  function getCursorPos (e) {
    let a,
        x = 0,
        y = 0
    e = e || window.event
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect()
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left
    y = e.pageY - a.top
    /* Consider any page scrolling: */
    x = x - window.pageXOffset
    y = y - window.pageYOffset
    return { x, y }
  }
}

export function slide (wrapper) {
  let menu = document.querySelector('#menu')
  let items = wrapper.children
  let height = wrapper.clientHeight + 1
  let isScroll = false
  let currIdx = 0

  function transitionendHandler (event) {
    if (event.propertyName === 'opacity') {
      isScroll = false
      event.target.removeEventListener('transitionend', transitionendHandler)
    }
  }

  function scrollDown () {
    let currItem = items[currIdx]
    let prevItem = items[currIdx - 1]
    let nextItem = items[currIdx + 1]
    if (!nextItem) {
      isScroll = false
      return
    }
    currIdx += 1
    if (prevItem) { prevItem.style.opacity = '0' }
    nextItem.addEventListener('transitionend', transitionendHandler)
    nextItem.style.transform = `translateY(0px)`
    nextItem.style.opacity = '1'
    currItem.style.opacity = '0.2'
    setActiveMenu()
  }

  function scrollUp () {
    let currItem = items[currIdx]
    let prevItem = items[currIdx - 2]
    let nextItem = items[currIdx - 1]
    if (!nextItem) {
      isScroll = false
      return
    }
    currIdx -= 1
    if (prevItem) { prevItem.style.opacity = '0.2' }
    nextItem.addEventListener('transitionend', transitionendHandler)
    nextItem.style.opacity = '1'
    currItem.style.transform = `translateY(${height}px)`
    currItem.style.opacity = '0'
    setActiveMenu()
  }

  function setActiveMenu () {
    let active = menu.querySelector('.active')
    if (active) active.classList.remove('active')
    menu.querySelector(`a[href="/${items[currIdx].dataset.menuanchor}"]`).classList.add('active')
  }

  for (let i = 1, max = items.length; i < max; i++) {
    items[i].style.transform = `translateY(${height}px)`
  }
  items[currIdx].style.opacity = '1'
  console.log(window.location)

  wrapper.addEventListener('wheel', event => {
    event.preventDefault()
    event.stopPropagation()
    if (isScroll) return
    isScroll = true
    if (event.deltaY > 0) { scrollDown() }
    else if (event.deltaY < 0) { scrollUp() }
  })
  setActiveMenu()
}
