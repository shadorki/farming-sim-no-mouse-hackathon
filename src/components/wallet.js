export default class Wallet {
  constructor(startingCash) {
    this.domElement = document.createElement('div')
    this.domElement.className = 'wallet'
    this.cash = startingCash || 0
  }
  updateCashOnDom() {
    this.domElement.textContent = `$${this.cash}`
  }
}
