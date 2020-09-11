import Level from './level'
import Player from './player'
import Tools from './tools'
import Inventory from './inventory'
import Modal from './modal'
import Shop from './shop'
import Wallet from './wallet'

export default class App {
  constructor(container, modalContainer) {
    this.container = container
    this.time = 0;
    this.gameLoopIntervalId = null;
    this.shop = new Shop(17, 0)
    this.map = new Level()
    this.player = new Player(19, 5, 'down')
    this.tools = new Tools()
    this.inventory = new Inventory()
    this.modal = new Modal(modalContainer)
    this.wallet = new Wallet(100)
    this.view = 'map'
    this.currentTile = null
    this.playerMovementKeyMap = {
      w: 'up',
      a: 'left',
      s: 'down',
      d: 'right',
      ' ': 'action',
      i: 'inventory'
    }
    this.toolsNavigateKeyMap = {
      ArrowLeft: 'previous',
      ArrowRight: 'next'
    }
    this.seedSelectionKeyMap = {
      a: 'previous',
      d: 'next',
      ArrowLeft: 'previous',
      ArrowRight: 'next',
      Escape: 'close',
      ' ': 'select'
    }
    this.inventoryKeyMap = {
      a: 'previous',
      d: 'next',
      ArrowLeft: 'previous',
      ArrowRight: 'next',
      Escape: 'close',
      ' ': 'close',
      Enter: 'close',
    }
    this.shopKeyMap = {
      a: 'previous',
      d: 'next',
      Tab: 'switch',
      ' ': 'select',
      Enter: 'select',
      Escape: 'close'
    }
  }
  startGameLoop() {
    this.gameLoopIntervalId = setInterval(this.gameLoop.bind(this), 1000)
  }
  gameLoop() {
    this.time++
    this.map.ageCrops()
  }
  setView(view) {
    this.view = view
  }
  handleKeyPress(e) {
    const { key } = e
    e.preventDefault()
    console.log(key)
    const views = {
      map: () => this.handleMapViewKeyPress(key),
      seedSelection: () => this.handleSeedSelectionKeyPress(key),
      inventory: () => this.handleInventorySelectionKeyPress(key),
      shop: () => this.handleShopSelectionKeyPress(key)
    }
    views[this.view]()
  }
  handleMapViewKeyPress(key) {
    if (this.playerMovementKeyMap.hasOwnProperty(key)) {
      this.handlePlayerMovement(key)
    } else if (this.toolsNavigateKeyMap.hasOwnProperty(key)) {
      this.handleToolNavigation(key)
    }
  }
  handleSeedSelectionKeyPress(key) {
    const action = this.seedSelectionKeyMap[key]
    if(!action) return;
    this.modal.navigateSeedModal(action)
  }
  handleInventorySelectionKeyPress(key) {
    const action = this.inventoryKeyMap[key]
    if (!action) return;
    this.modal.navigateSeedModal(action)
  }
  handleShopSelectionKeyPress(key) {
    const action = this.shopKeyMap[key]
    if (!action) return;
    this.modal.navigateShopModal(action)
  }
  handlePlayerMovement(key) {
    const direction = this.playerMovementKeyMap[key];
    let [x, y] = this.player.position
    const directionHandler = {
      up: () => y--,
      left: () => x--,
      down: () => y++,
      right: () => x++
    }
    switch(direction) {
      case 'action':
        directionHandler[this.player.direction]()
        const action = this.tools.selectedActionToExecute
        const tile = this.map.getTile(x, y)
        if(tile.isShop) {
          this.modal.generateShopModal(this.inventory.getCrops(), this.shop.shopInventory.getSeeds())
          this.setView('shop')
        } else {
          const actions = {
            inventory: () => {
              if (this.map.checkIfPlantable(x, y)) {
                this.setCurrentTile(tile)
                this.modal.generateSeedModal(this.inventory.getSeeds())
                this.setView('seedSelection')
              }
            },
            shovel: () => {
              if (!tile.hasCrop) return;
              if (!tile.isCropReadyToHarvest) return;
              const harvestedCrop = tile.harvestCrop()
              this.inventory.addCrop(harvestedCrop)
              console.log(this.inventory)
              this.map.removePlantedTile(tile)
            },
            'watering-can': () => {
              if (!tile.hasCrop) return;
              if (tile.isCropWatered || tile.isCropReadyToHarvest) return;
              tile.waterCrop()
            },
            hoe: () => {
              if (!tile.hasCrop) return;
              this.map.removePlantedTile(tile)
            }
          }
          actions[action]()
        }
      break;
      case 'inventory':
        // open inventory
        const {crops, seeds} = this.inventory
        this.modal.generateInventoryModal(crops, seeds)
        this.setView('inventory')
      break;
      default:
        this.player.updateDirection(direction)
        directionHandler[direction]()
        if (this.map.checkIfWalkable(x, y)) {
          this.player.updatePosition(x, y)
        }
      break;
    }
  }
  plantSeed(type) {
    this.inventory.removeSeed(type)
    this.currentTile.createCrop(type, this.time)
    this.container.appendChild(this.currentTile.crop.domElement)
    this.map.addPlantedTile(this.currentTile)
    this.setCurrentTile(null)
  }
  handleToolNavigation(key) {
    const action = this.toolsNavigateKeyMap[key]
    this.tools.navigate(action)
  }
  setCurrentTile(tile) {
    this.currentTile = tile
  }
  setCallbacks() {
    this.modal.setViewCb(this.setView.bind(this))
    this.modal.setCurrentTileCb(this.setCurrentTile.bind(this))
    this.modal.setPlantSeedCb(this.plantSeed.bind(this))
  }
  setListeners() {
    window.addEventListener('keydown', this.handleKeyPress.bind(this))
    this.player.setListeners()
  }
  setupDomElements() {
    this.container.appendChild(this.player.domElement)
    this.container.appendChild(this.tools.domElement)
    this.container.appendChild(this.shop.domElement)
    this.container.appendChild(this.wallet.domElement)
    this.shop.setPositionOnDom()
    this.wallet.updateCashOnDom()
  }
  start() {
    this.setCallbacks()
    this.setupDomElements()
    this.inventory.generateStarterSeeds(3)
    this.map.setShop(18, 0)
    this.setListeners()
    this.startGameLoop()
    console.log(this.map.tileMap)
  }
}
