import './styles/index.css'  
import Phaser from "phaser";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: '100%',
  height: '100%',
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  
}

function create() {

}

function update() {
}