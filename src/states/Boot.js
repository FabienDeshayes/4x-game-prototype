import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#eeeeee'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      custom: {
        families: ['moyko'],
        urls: ['../../assets/fonts/moyko.css']
      },
      active: this.fontsLoaded
    })

    // Used for better FPS debug
    this.game.time.advancedTiming = true
  }

  create() {
    const text = this.add.text(this.world.centerX, this.world.centerY, 'Loading...', { font: '16px Arial', fill: '#333333', align: 'center' })
    centerGameObjects(text)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('menu')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
