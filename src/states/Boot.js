import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EEEEEE'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Alegreya']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Loading fonts', { font: '16px Arial', fill: '#333333', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.game.time.advancedTiming = true
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game))
    this.game.iso.anchor.setTo(0.5, 0.2)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
