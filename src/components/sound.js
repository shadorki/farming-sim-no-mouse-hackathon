import money from '../../dist/assets/audio/money.wav'
import openInventory from '../../dist/assets/audio/open-inventory.wav'
import plant from '../../dist/assets/audio/plant.wav'
import step from '../../dist/assets/audio/step.mp3'
import tool from '../../dist/assets/audio/tool.wav'
import water from '../../dist/assets/audio/water.wav'

export default class Sound {
  constructor() {
    this.isMuted = true
    this.domElement = document.createElement('div')
    this.domElement.className = 'mute-button'
    this.sounds = {
      money: new Audio(money),
      openInventory: new Audio(openInventory),
      plant: new Audio(plant),
      step: new Audio(step),
      tool: new Audio(tool),
      water: new Audio(water)
    }
    for(const key in this.sounds) {
      this.sounds[key].volume = 0.0
    }
  }
  muteRequest() {
    this.isMuted = !this.isMuted
    if(!this.isMuted) {
      this.setPlay()
    } else {
      this.stopPlay()
    }
    this.updateMuteElement()
  }
  setPlay() {
    for (const key in this.sounds) {
      this.sounds[key].volume = 0.3
    }
  }
  stopPlay() {
    for (const key in this.sounds) {
      this.sounds[key].volume = 0.0
    }
  }
  playSound(sound) {
    if(this.isMuted) return;
    this.sounds[sound].play()
  }
  updateMuteElement() {
    if(this.isMuted) {
      this.domElement.classList.remove('not-muted')
    } else {
      this.domElement.classList.add('not-muted')
    }
  }
}
