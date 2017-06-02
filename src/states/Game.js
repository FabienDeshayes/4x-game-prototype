/* globals __DEV__ */
import Phaser from 'phaser'

const hexagonWidth = 116,
      hexagonHeight = 100,
      xTilesCount = 10,
      yTilesCount = 10

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('map_mountain_tile', 'assets/images/map_mountain_tile.png')
  }

  create () {
    this.map = game.add.group()
    for (let i = 0 ; i < xTilesCount ; i ++) {
      for (let j = 0 ; j < yTilesCount ; j ++) {
    		let hexagonX = (hexagonWidth * 1.5) * i + (hexagonWidth * 3 / 4) * (j % 2)
    		let hexagonY = hexagonHeight * j / 2
        console.log(`[${i},${j}]`, 'x', hexagonX, 'y', hexagonY)
    		let hexagon = this.game.add.sprite(hexagonX, hexagonY, 'map_mountain_tile')
    		this.map.add(hexagon)
      }
    }
  }

  update() {
  }

  render () {
    if (__DEV__) {
      game.debug.text('fps: ' + this.game.time.fps || '--', 2, 14, '#a7aebe')
    }
  }
}
