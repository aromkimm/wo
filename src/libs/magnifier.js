export default class Magnifier {
  constructor () {
    this.img = null
    this.glass = null
    this.w = null
    this.h = null
    this.bw = null
    this.zoom = null

    this.moveMagnifier = this.moveMagnifier.bind(this)
  }

  init (img, glass, zoom = 2, bw = 3) {
    this.glass = glass
    this.img = img
    this.zoom = zoom
    this.bw = bw
    this.w = glass.offsetWidth / 2
    this.h = glass.offsetHeight / 2

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = `url('${img.src}')`
    glass.style.backgroundRepeat = `no-repeat`
    glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`
    
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener('mousemove', this.moveMagnifier)
    img.addEventListener('mousemove', this.moveMagnifier)

    /*and also for touch screens:*/
    glass.addEventListener('touchmove', this.moveMagnifier)
    img.addEventListener('touchmove', this.moveMagnifier)
  }

  moveMagnifier (e) {
    let pos, x, y
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault()
    /* Get the cursor's x and y positions: */
    pos = this.getCursorPos(e)
    x = pos.x
    y = pos.y
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > this.img.width - this.w / this.zoom) {
      x = this.img.width - this.w / this.zoom
    }
    if (x < this.w / this.zoom) {
      x = this.w / this.zoom
    }
    if (y > this.img.height - this.h / this.zoom) {
      y = this.img.height - this.h / this.zoom
    }
    if (y < this.h / this.zoom) {
      y = this.h / this.zoom
    }
    /* Set the position of the magnifier glass: */
    this.glass.style.left = `${x - this.w}px`
    this.glass.style.top = `${y - this.h}px`
    /* Display what the magnifier glass "sees": */
    this.glass.style.backgroundPosition = `-${x * this.zoom - this.w + this.bw}px -${y * this.zoom - this.h + this.bw}px`

  }

  getCursorPos (e) {
    let a,
        x = 0,
        y = 0
    e = e || window.event
    /* Get the x and y positions of the image: */
    a = this.img.getBoundingClientRect()
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left
    y = e.pageY - a.top
    /* Consider any page scrolling: */
    x = x - window.pageXOffset
    y = y - window.pageYOffset
    return { x, y }
  }
}