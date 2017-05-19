/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Fantastic Creatures'
    let banner = this.add.text(this.world.centerX, 30, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.isoGroup = this.add.group()

    // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
    let cube
    for (var xx = 256; xx > 0; xx -= 48) {
       for (var yy = 256; yy > 0; yy -= 48) {
           // Create a cube using the new game.add.isoSprite factory method at the specified position.
           // The last parameter is the group you want to add it to (just like game.add.sprite)
           cube = game.add.isoSprite(xx, yy, 0, 'mushroom', 0, this.isoGroup)
           cube.anchor.set(0.5)

           // Store the old messed up ordering so we can compare the two later.
           cube.oldZ = cube.z
       }
    }

    // Just a var so we can tell if the group is this.sorted or not.
    this.sorted = false

    // Toggle sorting on click/tap.
    game.input.onDown.add(function () {
       this.sorted = !this.sorted
       if (this.sorted) {
           this.game.iso.simpleSort(this.isoGroup)
       }
       else {
           this.isoGroup.sort('oldZ')
       }
    }, this)
  }

  render () {
    if (__DEV__) {
      game.debug.text('fps: ' + this.game.time.fps || '--', 2, 14, '#a7aebe')
    }
  }
}
