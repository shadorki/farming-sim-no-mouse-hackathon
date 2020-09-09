export default class Player {
  constructor(startingX, startingY, startingDirection) {
    this.x = startingX
    this.y = startingY
    this.direction = startingDirection
    this.domElement = document.createElement('div')
    this.domElement.className = `player ${this.direction}`
    this.updatePositionOnDom()
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
