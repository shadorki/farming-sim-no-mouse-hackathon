import Level from './level'
import Player from './player'

export default class App {
  constructor(container) {
    this.container = container
    this.map = new Level()
    this.player = new Player(19, 5, 'down')
    this.keyMap = {
      w: 'up',
      a: 'left',
      s: 'down',
      d: 'right'
    }
  }
  handleKeyPress(e) {
    if(!this.keyMap.hasOwnProperty(e.key)) return;
    const direction = this.keyMap[e.key];
    this.player.updateDirection(direction)
    let [x, y] = this.player.position
    const directionHandler = {
      up: () => y--,
      left: () => x--,
      down: () => y++,
      right: () => x++
    }
    directionHandler[direction]()
    if(this.map.checkIfWalkable(x, y, direction)) {
      this.player.updatePosition(x, y)
    }
  }
  setListeners() {
    window.addEventListener('keydown', this.handleKeyPress.bind(this))
  }
  setupPlayer() {
    this.container.appendChild(this.player.domElement)
  }
  start() {
    this.setupPlayer()
    this.setListeners()
    console.log(this.map.tileMap)
  }
}
