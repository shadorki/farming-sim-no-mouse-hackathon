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
    const seedTypes = ['onion', 'string-bean', 'tomato', 'plum', 'pineapple', 'strawberry', 'potato', 'pumpkin', 'corn']
    for(let i = 0; i < seedTypes.length; i++) {
      for(let j = 0; j < 10; j++) {
        this.addSeed(new Seed(seedTypes[i]))
      }
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
