export default class Modal {
  constructor(modalContainer) {
    this.modalContainer = modalContainer
    this.setView = null
    this.setCurrentTile = null
    this.elementsToNavigate = null
    this.navigationPosition = 0
    this.selected = null
    this.plantSeed = null
    this.shopView = null
    this.isBalanceSufficient = null
    this.purchaseSeed = null
    this.sellCrop = null
  }
  show() {
    this.modalContainer.classList.remove('hidden')
  }
  hide() {
    if(!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    this.elementsToNavigate = null
    this.selected = null
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
  setCheckWalletBalanceCb(cb) {
    this.isBalanceSufficient = cb
  }
  setPurchaseSeedCb(cb) {
    this.purchaseSeed = cb
  }
  setSellCropCb(cb) {
    this.sellCrop = cb
  }
  generateSeedModal(seeds) {
    const [title, subheading,content] = this.modalContainer.children[0].children
    title.innerHTML = ''
    content.innerHTML = ''
    subheading.textContent = ''
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
    if(seedElements.length) {
      seedElements[0].classList.add('selected')
      this.selected = seedElements[0]
      const { type } = this.selected.dataset
      subheading.textContent = type;
    } else {
      this.selected = null
      subheading.textContent = 'No more seeds!'
    }
    this.elementsToNavigate = seedElements
    content.append(...seedElements)
    this.show()
  }
  generateInventoryModal(crops, seeds) {
    const [title, subheading, content] = this.modalContainer.children[0].children
    title.innerHTML = ''
    subheading.textContent = ''
    content.innerHTML = ''
    title.textContent = 'Inventory'
    const elements = []
    for (const type in crops) {
      const cropElement = document.createElement('div')
      cropElement.className = `crop ${type}`
      cropElement.setAttribute('data-type', type)
      cropElement.style.backgroundPosition = crops[type][0].backgroundCoords.join(' ')
      const cropCounter = document.createElement('div')
      cropCounter.textContent = crops[type].length
      cropElement.appendChild(cropCounter)
      elements.push(cropElement)
    }
    for (const type in seeds) {
      const seedElement = document.createElement('div')
      seedElement.className = `seed ${type}`
      seedElement.setAttribute('data-type', type)
      const seedCounter = document.createElement('div')
      seedCounter.textContent = seeds[type].length
      seedElement.appendChild(seedCounter)
      elements.push(seedElement)
    }
    if(elements.length) {
      elements[0].classList.add('selected')
      this.selected = elements[0]
      const { type } = this.selected.dataset
      subheading.textContent = type;
    } else {
      this.selected = null
      subheading.textContent = 'No more items!'
    }
    this.elementsToNavigate = elements
    content.append(...elements)
    this.show()
  }
  generateShopModal(userCrops, shopSeeds) {
    const [title, subheading, content] = this.modalContainer.children[0].children
    title.innerHTML = ''
    content.innerHTML = ''
    subheading.textContent = ''
    this.shopView = 'Buy'
    title.textContent = this.shopView
    const userElements = []
    const shopElements = []
    for (const crop in userCrops) {
      const cropElement = document.createElement('div')
      cropElement.className = `crop ${crop}`
      cropElement.style.backgroundPosition = userCrops[crop][0].backgroundCoords.join(' ')
      cropElement.setAttribute('data-type', crop)
      cropElement.setAttribute('data-price', userCrops[crop][0].worth)
      const cropPrice = document.createElement('div')
      cropPrice.className = 'price'
      cropPrice.textContent = userCrops[crop][0].worth
      const cropCount = document.createElement('div')
      cropCount.textContent = userCrops[crop].length
      cropElement.append(cropPrice, cropCount)
      userElements.push(cropElement)
    }
    for (const seed in shopSeeds) {
      const seedElement = document.createElement('div')
      seedElement.className = `seed ${seed}`
      seedElement.setAttribute('data-type', seed)
      seedElement.setAttribute('data-price', shopSeeds[seed][0].worth)
      const seedCounter = document.createElement('div')
      seedCounter.textContent = shopSeeds[seed].length
      const seedPrice = document.createElement('div')
      seedPrice.className = 'price'
      seedPrice.textContent = shopSeeds[seed][0].worth
      seedElement.append(seedPrice, seedCounter)
      shopElements.push(seedElement)
    }
    this.elementsToNavigate = {
      Buy: shopElements,
      Sell: userElements
    }
    if(this.elementsToNavigate[this.shopView].length) {
      this.elementsToNavigate[this.shopView][0].classList.add('selected')
      this.selected = this.elementsToNavigate[this.shopView][0]
      const { type } = this.selected.dataset
      subheading.textContent = type;
    } else {
      subheading.textContent = 'Out of Stock';
    }
    content.append(...this.elementsToNavigate[this.shopView])
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
    this.selected = currentSeed
    const { type } = this.selected.dataset
    const [, subheading] = this.modalContainer.children[0].children
    subheading.textContent = type;
  }
  navigateShopModal(action) {
    if (this.elementsToNavigate === null) return;
    const [title, subheading, content] = this.modalContainer.children[0].children
    const actions = {
      previous: () => {
        if (!this.navigationPosition) {
          this.navigationPosition = this.elementsToNavigate[this.shopView].length - 1
        } else {
          this.navigationPosition--
        }
      },
      next: () => {
        if (this.navigationPosition === this.elementsToNavigate[this.shopView].length - 1) {
          this.navigationPosition = 0
        } else {
          this.navigationPosition++
        }
      },
      close: this.hide.bind(this),
      select: () => {
        if (!this.elementsToNavigate[this.shopView].length) {
          subheading.textContent = this.shopView === 'Buy' ? 'Out of Stock' : 'Empty Inventory'
          return
        }
        let { type, price } = this.selected.dataset
        price = parseInt(price)
        if (this.shopView === 'Buy') {
          if (this.isBalanceSufficient(price)) {
              this.purchaseSeed(type, price)
          } else {
            subheading.textContent = 'Insufficient Balance'
          }
        } else {
          this.sellCrop(type, price)
        }
      },
      switch: () => {
        this.navigationPosition = 0
        this.shopView = this.shopView === 'Buy' ? 'Sell' : 'Buy'
        title.textContent = this.shopView
        const switchedElements = this.elementsToNavigate[this.shopView]
        content.innerHTML = ''
        content.append(...switchedElements)
      }
    }
    actions[action]()
    if (action === 'close' || action === 'select') return;
    const selectedElementsToNavigate = this.elementsToNavigate[this.shopView]
    for (let i = 0; i < selectedElementsToNavigate.length; i++) {
      selectedElementsToNavigate[i].classList.remove('selected')
    }
    const currentSeedOrCrop = selectedElementsToNavigate[this.navigationPosition]
    if(!currentSeedOrCrop) {
      subheading.textContent = this.shopView === 'Buy' ? 'Out of Stock' : 'Empty Inventory';
      this.selected = null
    } else {
      currentSeedOrCrop.classList.add('selected')
      this.selected = currentSeedOrCrop
      const { type } = this.selected.dataset
      subheading.textContent = type;
    }
  }
  resyncShopItemsAfterPurchase() {
    const itemPurchasedQuantityContainer = this.selected.lastElementChild
    let quantity = parseInt(itemPurchasedQuantityContainer.textContent)
    const [, subheading] = this.modalContainer.children[0].children
    if(quantity === 1) {
      this.selected.remove()
      this.elementsToNavigate[this.shopView] = this.elementsToNavigate[this.shopView].filter(element => element !== this.selected)
      if(this.elementsToNavigate[this.shopView].length) {
        const [newSelectedElement] = this.elementsToNavigate[this.shopView]
        this.selected = newSelectedElement
        this.selected.classList.add('selected')
        const { type } = this.selected.dataset
        subheading.textContent = type
      } else {
        this.selected = null
        subheading.textContent = this.shopView === 'Buy' ? 'Out of Stock' : 'Empty Inventory';
      }
    } else {
      quantity--
      itemPurchasedQuantityContainer.textContent = quantity
    }
  }
  selectSeed() {
    if(!this.selected) return;
    const { type } = this.selected.dataset
    if (!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    this.elementsToNavigate = null
    this.selected = null
    this.navigationPosition = 0
    this.setView('map')
    this.plantSeed(type)
  }
}
