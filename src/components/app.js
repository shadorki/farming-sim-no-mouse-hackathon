import Level from './level'
import Player from './player'
import Tools from './tools'

export default class App {
  constructor(container) {
    this.container = container
    this.map = new Level()
    this.player = new Player(19, 5, 'down')
    this.tools = new Tools()
    this.view = 'map'
    this.playerMovementKeyMap = {
      w: 'up',
      a: 'left',
      s: 'down',
      d: 'right'
    }
    this.toolsNavigateKeyMap = {
      ArrowLeft: 'previous',
      ArrowRight: 'next'
    }
  }
  handleKeyPress(e) {
    const { key } = e
    if(this.playerMovementKeyMap.hasOwnProperty(key)) {
      this.handlePlayerMovement(key)
    } else if(this.toolsNavigateKeyMap.hasOwnProperty(key)) {
      this.handleToolNavigation(key)
    }
  }
  handlePlayerMovement(key) {
    const direction = this.playerMovementKeyMap[key];
    this.player.updateDirection(direction)
    let [x, y] = this.player.position
    const directionHandler = {
      up: () => y--,
      left: () => x--,
      down: () => y++,
      right: () => x++
    }
    directionHandler[direction]()
    if (this.map.checkIfWalkable(x, y, direction)) {
      this.player.updatePosition(x, y)
    }
  }
  handleToolNavigation(key) {
    const action = this.toolsNavigateKeyMap[key]
    this.tools.navigate(action)
  }
  setListeners() {
    window.addEventListener('keydown', this.handleKeyPress.bind(this))
    this.player.setListeners()
  }
  setupDomElements() {
    this.container.appendChild(this.player.domElement)
    this.container.appendChild(this.tools.domElement)
  }
  start() {
    this.setupDomElements()
    this.setListeners()
    console.log(this.map.tileMap)
  }
}
