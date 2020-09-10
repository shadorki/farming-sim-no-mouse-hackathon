export default class Seed {
  constructor(type) {
    this.type = type
    const seedieTableCost = {
      onion:  2,
      'string-bean': 5,
      tomato: 7,
      plum: 10,
      pineapple: 12,
      strawberry: 15,
      potato: 17,
      pumpkin: 20,
      corn: 22
    }
    this.worth = seedieTableCost[type]
  }
}
