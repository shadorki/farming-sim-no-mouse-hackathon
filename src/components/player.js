export default class Player {
  constructor(startingX, startingY, startingDirection) {
    this.x = startingX
    this.y = startingY
    this.direction = startingDirection
    this.domElement = document.createElement('div')
    this.domElement.className = `player ${this.direction}`
    this.updatePosition()
  }
  updatePosition() {
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
  }
}
