import Inventory from "./inventory";

export default class Shop {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.shopInventory = new Inventory()
    this.domElement = document.createElement('div')
    this.domElement.className = 'shop'
    this.shopInventory.generateStarterSeeds(99)
  }
  setPositionOnDom() {
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
  }
}
