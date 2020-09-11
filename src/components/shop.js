import Inventory from "./inventory";

export default class Shop {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.shopInventory = new Inventory()
    this.domElement = document.createElement('div')
    this.domElement.className = 'shop'
    this.shopInventory.generateStarterSeeds(3)
  }
  setPositionOnDom() {
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
  }
  sellSeed(type) {
    const seed = this.shopInventory.removeSeed(type)
    return seed
  }
}
