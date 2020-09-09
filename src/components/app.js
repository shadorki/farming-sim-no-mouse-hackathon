import Level from './level'

export default class App {
  constructor(container) {
    this.container = container
    this.map = new Level()
  }
  renderMaps() {

  }
  start() {
    this.renderMaps()
  }
}
