import Seed from './seed'
export default class Inventory {
  constructor() {
    this.seeds = {}
    this.crops = {}
  }
  generateStarterSeeds(quantity) {
    const seedTypes = ['onion', 'string-bean', 'tomato', 'plum', 'pineapple', 'strawberry', 'potato', 'pumpkin', 'corn']
    for(let i = 0; i < seedTypes.length; i++) {
      for(let j = 0; j < quantity; j++) {
        this.addSeed(new Seed(seedTypes[i]))
      }
    }
  }
  generatePlayerSeeds() {
    for(let i = 0; i < 3; i++) {
      this.addSeed(new Seed('onion'))
    }
  }
  addSeed(seed) {
    const seedList = this.seeds[seed.type]
    if(seedList) {
      seedList.push(seed)
    } else {
      this.seeds[seed.type] = [seed]
    }
  }
  removeSeed(type) {
    const seedList = this.seeds[type]
    if(!seedList) return;
    const seed = seedList.pop()
    if(!seedList.length) {
      delete this.seeds[type]
    }
    return seed
  }
  addCrop(crop) {
    this.crops[crop.type] = this.crops[crop.type] || []
    this.crops[crop.type].push(crop)
  }
  removeCrop(type) {
    const crop = this.crops[type].pop()
    if(!this.crops[type].length) {
      delete this.crops[type]
    }
    return crop
  }
  getSeeds() {
    return this.seeds
  }
  getCrops() {
    return this.crops
  }
  getInventory() {
    return {
      seeds: this.seeds,
      crops: this.crops
    }
  }
}
