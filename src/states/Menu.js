import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    this.onNewGameClick = this.onNewGameClick.bind(this)
  }

  preload () {
    this.load.image('menu_new-game_btn', 'assets/images/menu_new-game_btn.jpg')
    this.load.image('menu_bg_img', 'assets/images/menu_bg_img.jpg')
  }

  create () {
    const menuBgImg = this.add.sprite(this.world.centerX, this.world.centerY, 'menu_bg_img')
    const title = this.add.text(this.world.centerX, 50, 'Fantastic Creatures', { font: '44px moyko', fill: '#333333', align: 'center' })
    const newGameBtn = this.add.sprite(this.world.centerX, this.world.centerY, 'menu_new-game_btn')

    newGameBtn.inputEnabled = true;
    newGameBtn.events.onInputDown.add(this.onNewGameClick)
    centerGameObjects([title, newGameBtn, menuBgImg])
  }

  onNewGameClick () {
    this.state.start('game')
  }
}
