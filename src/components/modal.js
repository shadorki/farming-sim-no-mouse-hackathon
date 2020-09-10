export default class Modal {
  constructor(modalContainer) {
    this.modalContainer = modalContainer
    this.elementsToNavigate = null
  }
  show() {
    this.modalContainer.classList.remove('hidden')
  }
  hide() {
    if(this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
  }
  generateSeedModal(seeds) {
    const [title, content] = this.modalContainer.children[0].children
    title.innerHTML = ''
    content.innerHTML = ''
    title.textContent = 'Select a seed to plant'
    const seedElements = []
    for(const type in seeds) {
      const seedElement = document.createElement('div')
      seedElement.className = `seed ${type}`
      const seedCounter = document.createElement('div')
      seedCounter.textContent = seeds[type].length
      seedElement.appendChild(seedCounter)
      seedElements.push(seedElement)
    }
    content.append(...seedElements)
    this.show()
  }
}
