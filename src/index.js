import './styles/index.css'  
import Phaser from "phaser";
import Customization from './customization/index.js'
import Dialog from './dialog/index.js'
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width:'100%',
  height:'100%',
  dom: {
    createContainer: true
  },
  scene: [Customization, Dialog]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
}, false);
/* function preload() {

  this.load.image("background", logoImg);
}

function create() {
  let image = this.add.image(window.innerWidth/2,  window.innerHeight/2, 'background');
}

function update() {
} */