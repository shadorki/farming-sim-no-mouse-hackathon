import Crop from "../components/crops"

export default class Tile {
  constructor(x, y, isPlantable, isWalkable) {
    this.x = x
    this.y = y
    this.isPlantable = isPlantable
    this.isWalkable = isWalkable
    this.crop = null
  }
  get hasCrop() {
    return !!this.crop
  }
  get isCropWatered() {
    return !!this.crop.isWatered // must double bang incase of undefined
  }
  get isCropReadyToHarvest() {
    return !!this.crop.isReadyToHarvest
  }
  waterCrop() {
    this.crop.water()
  }
  createCrop(type, timeStamp) {
    this.isPlantable = false
    this.crop = new Crop(type, timeStamp, this.x, this.y)
  }
  destroyCrop() {
    this.crop.kill()
    this.crop = null
    this.isPlantable = true
  }
  harvestCrop() {
    return this.crop.harvest()
  }
}
