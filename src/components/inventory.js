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
    seedList.pop()
    if(!seedList.length) {
      delete this.seeds[type]
    }
  }
  addCrop(crop) {
    this.crops[crop.type] = this.crops[crop.type] || []
    this.crops[crop.type].push(crop)
  }
  getSeeds() {
    return this.seeds
  }
  getCrops() {
    return this.crops
  }
}
