export default class Tutorial {
  constructor() {
    this.currentView = 0;
    this.pages = [
      {
        title: 'Tutorial',
        content: `Welcome to farming sim! \n
                  Built by Uzair Ashraf \n
                  For the No Mouse Mintbean Hackathon Challenge \n
                  Please use the left and right arrow keys to navigate through the pages \n
                  Press Esc to close the tutorial window`
      },
      {
        title: 'Basics',
        content: `WASD - move your character around \n
                  M - unmute/mute sound effects \n
                  I - view inventory \n
                  ESC - close screens \n
                  `
      },
      {
        title: 'Farming',
        content: `With the correct tool selected you can farm on the brown pieces of land \n
                  Space - Use tool \n
                  Left Arrow/Right Arrow - Navigate through your tool system`
      },
      {
        title: 'Farming - Planting',
        content: `With the seed bag selected you can select a seed to plant \n
                  A/D - Navigate between which seeds to plant in your inventory`
      },
      {
        title: 'Farming - Watering',
        content: `Your plants can only grow if they are watered, to water a plant use the watering can.  Some plants take longer to grow than others. Every time your plant grows you need to water it again`
      },
      {
        title: 'Farming - Harvesting',
        content: `Once you can't water the plant anymore, use the shovel to harvest the crop`
      },
      {
        title: 'Farming - Hoeing',
        content: 'To remove a seed/crop use the hoe.  Be careful because this will destroy it.'
      },
      {
        title: 'Shopping',
        content: `Once you have crops you can sell them.  You can use the money to purchase different types of seeds \n
        Tab - switch between selling and buying \n
        Left Arrow/ Right Arrow - move through items \n
        Esc - close shop screen \n
        Space - Purchase/Sell Item`
      }, {
        title: 'Thank you!',
        content: 'This game was built in 48 hours, if you would like to see the source code, press the G key!'
      }
    ]
  }
}
