import Crop from "../components/crops"

export default class Tile {
  constructor(x, y, isPlantable, isWalkable) {
    this.x = x
    this.y = y
    this.isPlantable = isPlantable
    this.isWalkable = isWalkable
    this.crop = null
  }
  createCrop(type) {
    this.isPlantable = false
    this.crop = new Crop(type, null, this.x, this.y)
  }
}
