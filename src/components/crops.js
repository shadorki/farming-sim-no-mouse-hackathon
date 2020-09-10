export default class Crop {
  constructor(type, timeStamp, x, y) {
    this.type = type
    this.x = x
    this.y = y
    this.timeStamp = timeStamp
    this.isWatered = false
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
    const veggieTable = { // lol
      tomato: {
        growthCycle: 30,
        stages: [
          ['-80px', '-32px'],
          ['-62px', '-32px'],
          ['-46px', '-32px'],
          ['-32px', '-32px'],
          ['-16px', '-32px'],
        ]
      }
    }
    this.stages = veggieTable[type].stages
    this.growthCycle = veggieTable[type].growthCycle
    const backgroundCoords = this.stages[this.currentStage]
    cropElement.style.backgroundPosition = backgroundCoords.join(' ')
  }
  grow() {
    this.age++
  }
}
