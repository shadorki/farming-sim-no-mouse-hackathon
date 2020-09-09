import Level from './level'
import Player from './player'

export default class App {
  constructor(container) {
    this.container = container
    this.map = new Level()
    this.player = new Player(19, 5, 'down')
  }
  setupPlayer() {
    this.container.appendChild(this.player.domElement)
  }
  start() {
    this.setupPlayer()
    console.log(this.map.tileMap)
  }
}
