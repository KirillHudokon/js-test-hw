import Phaser from "phaser"

export default class Customization extends Phaser.Scene {
    constructor(){
        super('Customization')
        this.state = {

        }
    }
    setState(){
        this.state = { g:'1' }
    }
    preload(){
        this.bodyLatino = this.load.image('body_latino', require('../assets/MAINHERO/start/body/1/face_f_1_body_f_regular_white_1.png').default);
        this.setState()
    }
    create(){
       /* console.log(this.bodyLatino,111)
        const container = document.createElement('div');
        const bodyContainer = document.createElement('div');
        const body = document.createElement('img');
        body.src = this.bodyLatino
        console.log(this.bodyLatino)
        bodyContainer.style = 'position:relative;';
        bodyContainer.append(body)
        container.style = 'background-color: yellow; position:relative; width: 220px; height: 100px; font: 48px Arial; font-weight: bold; color: white ';
        container.append(body)
        this.add.image(400, 300, 'body_latino')
        this.add.dom(window.innerWidth/2, window.innerHeight-50, body); */
    }
    update(){
        
    }
} 