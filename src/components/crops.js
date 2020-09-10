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
      onion: {
        growthCycle: 15,
        stages: [
          ['-80px', '0px'],
          ['-62px', '0px'],
          ['-46px', '0px'],
          ['-32px', '0px'],
          ['-16px', '0px'],
        ]
      },
      'string-bean': {
        growthCycle: 30,
        stages: [
          ['-80px', '-16px'],
          ['-62px', '-16px'],
          ['-46px', '-16px'],
          ['-32px', '-16px'],
          ['-16px', '-16px'],
        ]
      },
      tomato: {
        growthCycle: 45,
        stages: [
          ['-80px', '-32px'],
          ['-62px', '-32px'],
          ['-46px', '-32px'],
          ['-32px', '-32px'],
          ['-16px', '-32px'],
        ]
      },
      plum: {
        growthCycle: 60,
        stages: [
          ['-80px', '-48px'],
          ['-62px', '-48px'],
          ['-46px', '-48px'],
          ['-32px', '-48px'],
          ['-16px', '-48px'],
        ]
      },
      pineapple: {
        growthCycle: 75,
        stages: [
          ['-80px', '-64px'],
          ['-62px', '-64px'],
          ['-46px', '-64px'],
          ['-32px', '-64px'],
          ['-16px', '-64px'],
        ]
      },
      strawberry: {
        growthCycle: 90,
        stages: [
          ['-80px', '-96px'],
          ['-62px', '-96px'],
          ['-46px', '-96px'],
          ['-32px', '-96px'],
          ['-16px', '-96px'],
        ]
      },
      potato: {
        growthCycle: 105,
        stages: [
          ['-80px', '-112px'],
          ['-62px', '-112px'],
          ['-46px', '-112px'],
          ['-32px', '-112px'],
          ['-16px', '-112px'],
        ]
      },
      pumpkin: {
        growthCycle: 120,
        stages: [
          ['-80px', '-128px'],
          ['-62px', '-128px'],
          ['-46px', '-128px'],
          ['-32px', '-128px'],
          ['-16px', '-128px'],
        ]
      },
      corn: {
        growthCycle: 135,
        stages: [
          ['-80px', '-144px'],
          ['-62px', '-144px'],
          ['-46px', '-144px'],
          ['-32px', '-144px'],
          ['-16px', '-144px'],
        ]
      },
    }
    this.stages = veggieTable[type].stages
    this.growthCycle = veggieTable[type].growthCycle
    const backgroundCoords = this.stages[this.currentStage]
    cropElement.style.backgroundPosition = backgroundCoords.join(' ')
  }
  grow() {
    this.age++
  }
  water() {
    this.isWatered = true
    this.domElement.firstElementChild.classList.add('watered')
  }
}
