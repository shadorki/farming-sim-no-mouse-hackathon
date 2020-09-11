import HarvestedCrop from './harvested-crop'
import veggieTable from '../models/crop-data'

export default class Crop {
  constructor(type, timeStamp, x, y) {
    this.type = type
    this.x = x
    this.y = y
    this.timeStamp = timeStamp
    this.isWatered = false
    this.isReadyToHarvest = false
    this.growthCycle = null
    this.age = 0
    this.currentStage = 0;
    this.stages = null
    this.domElement = document.createElement('div')
    this.domElement.className = `crop-container`
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
    const cropElement = document.createElement('div')
    cropElement.className = `crop ${type}`
    this.domElement.appendChild(cropElement)
    this.stages = veggieTable[type].stages
    this.growthCycle = veggieTable[type].growthCycle
    this.worth = veggieTable[type].worth
    const backgroundCoords = this.stages[this.currentStage]
    cropElement.style.backgroundPosition = backgroundCoords.join(' ')
  }
  grow() {
    if(!this.isWatered || this.isReadyToHarvest) return;
    this.age++
    if(this.age > this.growthCycle) {
      this.growToNextStage()
    }
  }
  growToNextStage() {
    this.currentStage++
    if(this.currentStage === this.stages.length) {
      this.isReadyToHarvest = true
    } else {
      const backgroundCoords = this.stages[this.currentStage]
      this.domElement.firstElementChild.style.backgroundPosition = backgroundCoords.join(' ')
    }
    this.isWatered = false
    this.domElement.firstElementChild.classList.remove('watered')
    this.age = 0
  }
  water() {
    this.isWatered = true
    this.domElement.firstElementChild.classList.add('watered')
  }
  kill() {
    this.domElement.remove()
  }
  harvest() {
    return new HarvestedCrop(
      this.type,
      ['0px', this.stages[0][1]],
      this.worth
    )
  }
}
