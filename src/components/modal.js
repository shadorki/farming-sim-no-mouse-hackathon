export default class Modal {
  constructor(modalContainer) {
    this.modalContainer = modalContainer
    this.setView = null
    this.setCurrentTile = null
    this.elementsToNavigate = null
    this.navigationPosition = 0
    this.selectedSeed = null
    this.plantSeed = null
  }
  show() {
    this.modalContainer.classList.remove('hidden')
  }
  hide() {
    console.log('hit')
    if(!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    this.elementsToNavigate = null
    this.selectedSeed = null
    this.navigationPosition = 0
    this.setView('map')
    this.setCurrentTile(null)
  }
  setViewCb(cb) {
    this.setView = cb
  }
  setCurrentTileCb(cb) {
    this.setCurrentTile = cb
  }
  setPlantSeedCb(cb) {
    this.plantSeed = cb
  }
  generateSeedModal(seeds) {
    const [title, subheading,content] = this.modalContainer.children[0].children
    title.innerHTML = ''
    content.innerHTML = ''
    title.textContent = 'Select a seed to plant'
    const seedElements = []
    for(const type in seeds) {
      const seedElement = document.createElement('div')
      seedElement.className = `seed ${type}`
      seedElement.setAttribute('data-type', type)
      const seedCounter = document.createElement('div')
      seedCounter.textContent = seeds[type].length
      seedElement.appendChild(seedCounter)
      seedElements.push(seedElement)
    }
    seedElements[0].classList.add('selected')
    this.selectedSeed = seedElements[0]
    const { type } = this.selectedSeed.dataset
    subheading.textContent = type;
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
      },
      close: this.hide.bind(this),
      select: this.selectSeed.bind(this)
    }
    actions[action]()
    if(action === 'close' || action === 'select') return;
    for (let i = 0; i < this.elementsToNavigate.length; i++) {
      this.elementsToNavigate[i].classList.remove('selected')
    }
    const currentSeed = this.elementsToNavigate[this.navigationPosition]
    currentSeed.classList.add('selected')
    this.selectedSeed = currentSeed
    const { type } = this.selectedSeed.dataset
    const [, subheading] = this.modalContainer.children[0].children
    subheading.textContent = type;
  }
  selectSeed() {
    const { type } = this.selectedSeed.dataset
    if (!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    this.elementsToNavigate = null
    this.selectedSeed = null
    this.navigationPosition = 0
    this.setView('map')
    this.plantSeed(type)
  }
}
