export default class Tutorial {
  constructor(domElement) {
    this.currentView = 0;
    this.domElement = domElement
    const [heading, content, pageCounterContainer] = this.domElement.firstElementChild.children
    this.heading = heading
    this.content = content
    this.pageCounter = pageCounterContainer.firstElementChild
    this.setView = null
    this.pages = [
      {
        title: 'Tutorial',
        content: `Welcome to farming sim! <br>
                  Built by Uzair Ashraf <br>
                  For the No Mouse Mintbean Hackathon Challenge <br>
                  Please use the left and right arrow keys to navigate through the pages <br>
                  Press Esc to close the tutorial window`
      },
      {
        title: 'Basics',
        content: `WASD - move your character around <br>
                  M - unmute/mute sound effects <br>
                  I - view inventory <br>
                  ESC - close screens <br>
                  SPACE - Use tool or interact with shop <br>
                  `
      },
      {
        title: 'Farming',
        content: `With the correct tool selected you can farm on the brown pieces of land <br>
                  Space - Use tool <br>
                  Left Arrow/Right Arrow - Navigate through your tool system`
      },
      {
        title: 'Farming - Planting',
        content: `With the seed bag selected you can select a seed to plant <br>
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
        content: `Once you have crops you can sell them.  You can use the money to purchase different types of seeds <br>
        Tab - switch between selling and buying <br>
        A/D - move through items <br>
        Esc - close shop screen <br>
        Space - Purchase/Sell Item`
      }, {
        title: 'Thank you!',
        content: 'This game was built in 48 hours, if you would like to see the source code, press the G key!'
      }
    ]
  }
  setViewCb(cb) {
    this.setView = cb
  }
  updateContent() {
    const pageData = this.pages[this.currentView]
    this.heading.textContent = pageData.title
    this.content.innerHTML = pageData.content
    this.pageCounter.textContent = `${this.currentView + 1} / ${this.pages.length}`
  }
  show() {
    this.updateContent()
    this.domElement.classList.remove('hidden')
  }
  hide() {
    if (!this.domElement.classList.contains('hidden')) {
      this.domElement.classList.add('hidden')
    }
    this.setView('map')
  }
  navigateTutorial(action) {
    const actions = {
      left: () => {
        if(!this.currentView) {
          this.currentView = this.pages.length - 1
        } else {
          this.currentView--
        }
        this.updateContent()
      },
      right: () => {
        if(this.currentView === this.pages.length - 1) {
          this.currentView = 0
        } else {
          this.currentView++
        }
        this.updateContent()
      },
      close: () => {
        this.hide()
      },
      github: () => {
        window.open('https://github.com/uzair-ashraf/farming-sim-no-mouse-hackathon')
      }
    }
    actions[action]()
  }
}
