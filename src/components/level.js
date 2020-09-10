import Tile from "./tile"
import Crop from "./crops"

export default class Level {
  constructor() {
    this.tileMap = this.generateTileMap()
    this.plantedTiles = []
  }
  generateTileMap() {
    const map = {}
    const plantableRows = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    let yAxis = 0

    for (let y = 0; y < 8; y++) {
      let xAxis = 0
      for (let x = 0; x < 20; x++) {
        let tile = null
        let isWalkable = false
        let isPlantable = false
        if (!x || !y || y === 6 || y === 7) {
          isPlantable = false
          isWalkable = false
        } else if (plantableRows.has(x)) {
          isWalkable = true
          isPlantable = true
        } else {
          isWalkable = true
          isPlantable = false
        }
        tile = new Tile(xAxis, yAxis, isPlantable, isWalkable)
        // Use a lookup table instead of array for O(1)
        map[`${xAxis}/${yAxis}`] = tile
        xAxis++
      }
      xAxis = 0
      yAxis++
    }
    return map
  }
  ageCrops() {
    if (!this.plantedTiles.length) return;
    console.log('Aging..')
    console.log(this.plantedTiles)
    this.plantedTiles.forEach(tile => tile.crop.grow())
  }
  getTile(x, y) {
    return this.tileMap[`${x}/${y}`]
  }
  addPlantedTile(tile) {
    this.plantedTiles.push(tile)
  }
  checkIfWalkable(x, y) {
    const tile = this.tileMap[`${x}/${y}`]
    if(!tile) return false;
    return tile.isWalkable
  }
  checkIfPlantable(x, y) {
    const tile = this.tileMap[`${x}/${y}`]
    if (!tile) return false;
    return tile.isPlantable
  }
}
