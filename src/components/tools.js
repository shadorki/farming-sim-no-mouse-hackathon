export default class Tools {
  constructor() {
    this.selectedToolIndex = 0
    this.tools = ['inventory', 'shovel', 'watering-can', 'hoe']
    this.domElement = this.createToolSet()
  }
  createToolSet() {
    const toolContainer = document.createElement('div')
    toolContainer.className ='tools-container'
    const tools = this.tools.map(t => {
      const toolBlock = document.createElement('div')
      toolBlock.className = 'tool-block'
      const tool = document.createElement('div')
      tool.className = `tool ${t}`
      toolBlock.appendChild(tool)
      return toolBlock
    })
    tools[0].classList.add('selected');
    toolContainer.append(...tools)
    return toolContainer
  }
  navigate(action) {
    const actions = {
      previous: () => {
        if (!this.selectedToolIndex) {
          this.selectedToolIndex = this.tools.length - 1
        } else {
          this.selectedToolIndex--
        }
      },
      next: () => {
        if (this.selectedToolIndex === this.tools.length - 1) {
          this.selectedToolIndex = 0
        } else {
          this.selectedToolIndex++
        }
      }
    }
    actions[action]()
    this.updateToolSelection()
  }
  updateToolSelection() {
    for(let i = 0; i < this.domElement.children.length; i++) {
      this.domElement.children[i].classList.remove('selected')
    }
    const currentTool = this.domElement.children[this.selectedToolIndex]
    currentTool.classList.add('selected')
  }
}
