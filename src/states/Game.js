/* globals __DEV__ */
import Phaser from 'phaser'
import tilesetData from '../../assets/data/map_tiles_data.json'

function getTileSprite(idx) {
  switch (idx) {
    case 1:
     return 'map_mountain_tile'
   case 2:
     return 'map_grassland_tile'
   case 3:
   default:
     return 'map_forest_tile'
  }
}

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('map_mountain_tile', 'assets/images/map_mountain_tile.png')
    this.load.image('map_grassland_tile', 'assets/images/map_grassland_tile.png')
    this.load.image('map_forest_tile', 'assets/images/map_forest_tile.png')
    this.load.image('map_pixel_object', 'assets/images/map_placeholder_player.png')
  }

  create () {
    const tiles = tilesetData.tiles,
          width = tilesetData.tileDimensions.width,
          height = tilesetData.tileDimensions.height

    this.game.world.setBounds(0, 0, tiles[0].length * width + width, height + tiles.length * height / 2)
    this.map = this.game.add.group()
    for (let i = 0 ; i < tiles.length ; i ++) {
      for (let j = 0 ; j < tiles[i].length ; j ++) {
        const tileType = getTileSprite(tiles[i][j])
    		const hexagonX = (width * 1.5) * i + (width * 3 / 4) * (j % 2)
    		const hexagonY = height * j / 2
    		const tile = this.game.add.sprite(hexagonX, hexagonY, tileType)
        tile.inputEnabled = true
        tile.data = tileType
        tile.events.onInputOver.add(this.over, this, tile)
        tile.events.onInputOut.add(this.out, this, tile)
    		this.map.add(tile)
      }
    }
    this.cameraPixel = this.game.add.sprite(500, 200, 'map_pixel_object')
    this.game.physics.arcade.enable(this.cameraPixel)
    this.game.camera.follow(this.cameraPixel)
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  out () {
    console.log('out of tile')
  }

  over(tile) {
    console.log('over tile', tile.data)
  }

  update() {
    this.cameraPixel.body.velocity.y = 0
    this.cameraPixel.body.velocity.x = 0


    if (this.cursors.up.isDown) {
        this.cameraPixel.body.velocity.y -= 300
    }
    else if (this.cursors.down.isDown) {
        this.cameraPixel.body.velocity.y += 300
    }

    if (this.cursors.left.isDown) {
        this.cameraPixel.body.velocity.x -= 300
    }
    else if (this.cursors.right.isDown) {
        this.cameraPixel.body.velocity.x += 300
    }
  }

  render () {
    if (__DEV__) {
      game.debug.text('fps: ' + this.game.time.fps || '--', 2, 14, '#a7aebe')
    }
  }
}
