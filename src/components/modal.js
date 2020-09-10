export default class Modal {
  constructor(modalContainer) {
    this.modalContainer = modalContainer
    this.elementsToNavigate = null
    this.navigationPosition = 0
  }
  show() {
    this.modalContainer.classList.remove('hidden')
  }
  hide() {
    if(this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    this.elementsToNavigate = null
    this.navigationPosition = 0
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
    seedElements[0].classList.add('selected')
    this.elementsToNavigate = seedElements
    content.append(...seedElements)
    this.show()
  }
  navigateSeedModal(action) {
    if(this.elementsToNavigate === null) return;
    const actions = {
      previous: () => {
        if (!this.navigationPosition) {
          this.navigationPosition = this.elementsToNavigate.length - 1
        } else {
          this.navigationPosition--
        }
      },
      next: () => {
        if (this.navigationPosition === this.elementsToNavigate.length - 1) {
          this.navigationPosition = 0
        } else {
          this.navigationPosition++
        }
      }
    }
    actions[action]()
    for (let i = 0; i < this.elementsToNavigate.length; i++) {
      this.elementsToNavigate[i].classList.remove('selected')
    }
    const currentSeed = this.elementsToNavigate[this.navigationPosition]
    currentSeed.classList.add('selected')
  }
}
