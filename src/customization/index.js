import Phaser from "phaser"

export default class Customization extends Phaser.Scene {
    constructor(){
        super('Customization')
        this.state = {
            steps:['body', 'hair', 'cloths'],
            currentStep:1
        }
        this.setState = this.setState.bind(this)
        this.options;
        this.containerText;
    }
    setState(newState){
        this.state = {...this.state,...newState}
    }
    getBody(id,type){
        const emotions = ['angry', 'default', 'joy', 'sad', 'shy', 'surprised'];
        const parent = this
        try{
            const name = `body_${type}`
            const path = require(`../assets/MAINHERO/start/body/${id}/face_f_${id}_body_f_regular_${type}_${id}.png`).default
            this.load.image(name, path);
            this.setState({
                body:this.state.body ? [...this.state.body,{
                    type:name, link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}
                }] : [{
                    type:name, link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}
                }]
            })
        }catch(e){
            console.error(e.message)
        }
        emotions.forEach(emotion => {
            try{
            const name = `face_f_${id}_${emotion}`
            const path = require(`../assets/MAINHERO/start/body/${id}/emotions/face_f_${id}_${emotion}.png`).default
            this.load.image(name, path);
            this.setState({
                emotions:this.state.emotions ? 
                [...this.state.emotions,{type:name, link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}}] :
                [{type:name, link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}}]
            })
            }catch(e){
               console.error(e.message)     
            }
        })
    }
    getClothes(){
        const parent = this
        try{
            this.load.image('cloths_f_regular_8', require('../assets/MAINHERO/start/clothes/cloths_f_regular_8.png').default);
            this.load.image('cloths_f_regular_9', require('../assets/MAINHERO/start/clothes/cloths_f_regular_9.png').default);
            this.load.image('cloths_f_regular_16', require('../assets/MAINHERO/start/clothes/cloths_f_regular_16.png').default);
            this.setState({
                cloths:[ 
                    {type:'cloths_f_regular_8', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
                    {type:'cloths_f_regular_9', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
                    {type:'cloths_f_regular_16', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}}
                ]})
        }catch(e){
            console.error(e.message)    
        }
    }
    getHair(){
        const parent = this
        try{
            this.load.image('hair_f_3_back', require('../assets/MAINHERO/start/hair/back/hair_f_3_back.png').default);
            this.load.image('hair_f_4_back', require('../assets/MAINHERO/start/hair/back/hair_f_4_back.png').default);
            this.load.image('hair_f_3', require('../assets/MAINHERO/start/hair/front/hair_f_3.png').default);
            this.load.image('hair_f_4', require('../assets/MAINHERO/start/hair/front/hair_f_4.png').default);
            this.setState({
                hair:[
                    {type:'hair_f_3', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
                    {type:'hair_f_4', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}}
                ]
            })
        }catch(e){
            console.error(e.message)    
        }
    }
    getAssets(){
        this.load.image('vector', require('../assets/Vector.png').default);
        this.load.image('view', require('../assets/view.png').default);
        this.load.image('inactive', require('../assets/inActive.png').default);
        this.load.image('active', require('../assets/active.png').default);
    }
    preload(){
        const parent = this
        this.getBody(1,'white')
        this.getBody(3,'latino')
        this.getClothes()
        this.getHair()
        this.getAssets()
        this.setState({
            default:{
                body:{type:'body_white', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}}, 
                cloths: {type:'cloths_f_regular_8', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
                emotion: {type:'face_f_1_surprised', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
                hair: {type:'hair_f_4', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
            } 
        })
    }
    create(){
        const formStyles = {
            background: "rgba(255, 255, 255, 0.8)",
            width: "288px",
            height: "88px",
            'box-shadow': "0px 3px 4px rgba(0, 0, 0, 0.24)",
            'border-radius': '12px',
            'font-size': '20px',
            'text-align': 'center',
            'color': '#141A3D'    
        }
        const parent = this
        const stepsContainer = document.createElement('div')
        stepsContainer.style = 'width: 252px; display:flex; align-items:center; justify-content:center'

        const container = document.createElement('div');
        this.options = document.createElement('div');
        this.containerText = document.createElement('div');
        const confirmButton = document.createElement('div');
        const choosen = document.createElement('div');
        choosen.innerHTML = 'Item choosen'.toUpperCase();
        choosen.style='width: 252px;height: 40px; background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%), rgba(191, 16, 90, 0.8); border: 1px solid rgba(243, 76, 116, 0.6); box-sizing: border-box; box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-bottom-left-radius:24px; border-bottom-right-radius: 24px; font-size:16px; font-family: Nunito Sans Bold; line-height: 32px; text-align:center; color:white; text-align:center'
        confirmButton.style = 'position: absolute; width:216px; height:42px; background: linear-gradient(180deg, #DB5186 0%, #C6236A 100%); border: 2px solid #D34E7E;box-sizing: border-box;box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-radius: 30px; line-height:34.5px; font-family: Nunito Sans Bold; color:white; font-size:15px; text-align:center'
        confirmButton.innerHTML = 'Confirm'
        container.style = "postition: relative; background: rgba(255, 255, 255, 0.8); width: 288px; height:88px; box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-radius: 12px; font-size: 20px; text-align: center; color: #141A3D; overflow:hidden; font-weight:400; font-weight:normal; font-family: Nunito Sans Bold"
        this.options.style = "width: 120px;height: 25px; margin:0px auto 22px; margin-bottom:20px; background: linear-gradient(180deg, #F48BB8 0%, #ED5C9A 100%);border: 1px solid #FBD4E5;box-sizing: border-box;box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15), inset 1px -2px 2px rgba(232, 131, 173, 0.25); border-bottom-left-radius:24px; border-bottom-right-radius: 24px; font-size:10px; display:flex; align-items: center; justify-content:center; color:white "
        this.options.innerHTML = `Choose option 1/${this.state[this.state.steps[this.state.currentStep]].length}`
        confirmButton.onclick= function(){
            console.log(1)
           parent.state.default.hair.link.destoy();
           parent.state.default.hair.type = 'hair_f_3'
           //hair: {type:'hair_f_3', link:function(){ return parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type)}},
        }
        this.containerText.innerHTML = 'Choose your hair'
        container.append(this.options,this.containerText)
        Object.values(this.state.default).forEach((img)=> img.link().setScale(0.3))
        //this.add.dom(window.innerWidth/2, window.innerHeight-450, choosen);
        this.add.dom(window.innerWidth/2, window.innerHeight-69, confirmButton);
        this.add.dom(window.innerWidth/2, window.innerHeight-148, container);
        this.home = this.add.sprite(window.innerWidth/2+130, window.innerHeight-67, 'view').setInteractive();
        this.home.on('pointerdown', ()=>console.log(1)); 
        this.left = this.add.sprite(window.innerWidth/2-130, window.innerHeight-267, 'vector').setInteractive().setScale(0.7);
        this.left.on('pointerdown', ()=>console.log('left')); 
        this.right = this.add.sprite(window.innerWidth/2+130, window.innerHeight-267, 'vector').setInteractive().setScale(0.7)
        this.right.angle = 180
        this.right.on('pointerdown', ()=>parent.state.default.hair.type = 'hair_f_4'); 
       // this.active = this.add.sprite(window.innerWidth/2, window.innerHeight-203, 'active').setInteractive()
        //this.inActive = this.add.sprite(window.innerWidth/2-15, window.innerHeight-204, 'inactive').setInteractive()
        this.add.dom(window.innerWidth/2, window.innerHeight-204, stepsContainer);
        console.log(this.state)
    }
    update(){
        console.log(this.state.default.hair)
        this.containerText.innerHTML = `Choose your ${this.state.steps[this.state.currentStep-1]}`
        this.options.innerHTML = `Choose option 1/${this.state[this.state.steps[this.state.currentStep-1]].length}`
        Object.values(this.state.default).forEach((img)=> img.link().setScale(0.3))
    }
} 