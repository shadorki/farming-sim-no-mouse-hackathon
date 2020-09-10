import Seed from './seed'

export default class Inventory {
  constructor() {
    this.inventory = {
      seeds: {},
      crops: {}
    }
    this.generateStarterSeeds()
  }
  generateStarterSeeds() {
    for(let i = 0; i < 10; i++) {
      this.addSeed(new Seed('tomato'))
    }
  }
  addSeed(seed) {
    const seedList = this.inventory.seeds[seed.type]
    if(seedList) {
      seedList.push(seed)
    } else {
      this.inventory.seeds[seed.type] = [seed]
    }
  }
  addCrop(crop) {
    const cropList = this.inventory.crops[crop.type]
    if (cropList) {
      cropList.push(crop)
    } else {
      this.inventory.crops[crop.type] = [crop]
    }
  }
  getSeeds() {
    return this.inventory.seeds
  }
  getCrops() {
    return this.inventory.crops
  }
}
