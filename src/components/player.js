export default class Player {
  constructor(startingX, startingY, startingDirection) {
    this.x = startingX
    this.y = startingY
    this.direction = startingDirection
    this.domElement = document.createElement('div')
    this.domElement.className = `player ${this.direction}`
    this.updatePositionOnDom()
    this.playSound = null
  }
  playSoundCb(cb) {
    this.playSound = cb
  }
  setListeners() {
    this.domElement.addEventListener('transitionstart', () => {
      this.playSound('step')
      if(this.domElement.classList.contains('walking')) return;
      this.domElement.classList.add('walking')
    })
    this.domElement.addEventListener('transitionend', () => {
      this.domElement.classList.remove('walking')
    })
  }
  get position() {
    return[this.x, this.y]
  }
  updatePosition(x, y) {
    this.x = x
    this.y = y
    this.updatePositionOnDom()
  }
  updateDirection(direction) {
    if(direction === this.direction) return;
    this.direction = direction
    this.updateDirectionOnDom()
  }
  updatePositionOnDom() {
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
  }
  updateDirectionOnDom() {
    this.domElement.className = `player ${this.direction}`
  }
}
