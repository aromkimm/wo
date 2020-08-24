export default class Magnifier {
  constructor (img, glass, zoom = 2, bw = 3) {
    this.img = img
    this.glass = glass
    this.w = glass.offsetWidth / 2
    this.h = glass.offsetHeight / 2
    this.bw = bw
    this.zoom = zoom

    this.moveMagnifier = this.moveMagnifier.bind(this)
    this.init()
  }

  init () {
    /* Set background properties for the magnifier glass: */
    this.glass.style.backgroundImage = `url('${this.img.src}')`
    this.glass.style.backgroundRepeat = `no-repeat`
    this.glass.style.backgroundSize = `${this.img.width * this.zoom}px ${this.img.height * this.zoom}px`
    
    /* Execute a function when someone moves the magnifier glass over the image: */
    this.glass.addEventListener('mousemove', this.moveMagnifier)
    this.img.addEventListener('mousemove', this.moveMagnifier)

    /*and also for touch screens:*/
    this.glass.addEventListener('touchmove', this.moveMagnifier)
    this.img.addEventListener('touchmove', this.moveMagnifier)
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