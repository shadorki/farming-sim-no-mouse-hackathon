export default class Wallet {
  constructor(startingCash) {
    this.domElement = document.createElement('div')
    this.domElement.className = 'wallet'
    this.cash = startingCash || 0
  }
  isBalanceSufficient(amount) {
    return this.cash >= amount
  }
  spendCash(amount) {
    this.cash -= amount
  }
  earnCash(amount) {
    this.cash += amount
  }
  updateCashOnDom() {
    this.domElement.textContent = `$${this.cash}`
  }
}
