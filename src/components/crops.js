export default class Crop {
  constructor(type, growthCycle, timeStamp) {
    this.type = type
    this.growthCycle = growthCycle
    this.timeStamp = timeStamp
    this.age = 0
    this.currentStage = 0;
    this.stages = this.getCropStages(this.type)
  }
  getCropStages() {
    const stages = {
      tomato: [
        ['-80px', '-32px'],
        ['-62px', '-32px'],
        ['-46px', '-32px'],
        ['-32px', '-32px'],
        ['-16px', '-32px'],
      ]
    }
  }
  grow() {
    this.age++
  }
}
