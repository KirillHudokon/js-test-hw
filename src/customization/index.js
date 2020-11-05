import Phaser from "phaser"

export default class Customization extends Phaser.Scene {
    constructor(){
        super('Customization')
        this.state = {
            steps:['body', 'hair', 'cloths'],
            currentStep:1,
            currentOption:1
        }
        this.setState = this.setState.bind(this)
        this.itemOptionsText;
        this.containerText;
        this.itemOptions=[]
    }
    setState(newState){
        this.state = {...this.state,...newState}
    }
    getBody(id,type){
        try{
            const name = `body_${type}`
            const path = require(`../assets/MAINHERO/start/body/${id}/face_f_${id}_body_f_regular_${type}_${id}.png`).default
            this.load.image(name, path);
            this.setState({
                body:this.state.body ? [...this.state.body, name]:[name]
            })
        }catch(e){
            console.error(e.message)
        }
        
    }
    getEmotions(id){
        const emotions = ['angry', 'default', 'joy', 'sad', 'shy', 'surprised'];
        emotions.forEach(emotion => {
            try{
            const name = `face_f_${id}_${emotion}`
            const path = require(`../assets/MAINHERO/start/body/${id}/emotions/face_f_${id}_${emotion}.png`).default
            this.load.image(name, path);
            this.setState({
                emotions:this.state.emotions ?  [...this.state.emotions,emotion] : [emotion]
            })
            }catch(e){
               console.error(e.message)     
            }
        })
    }
    getClothes(){
        try{
            this.load.image('cloths_f_regular_8', require('../assets/MAINHERO/start/clothes/cloths_f_regular_8.png').default);
            this.load.image('cloths_f_regular_9', require('../assets/MAINHERO/start/clothes/cloths_f_regular_9.png').default);
            this.load.image('cloths_f_regular_16', require('../assets/MAINHERO/start/clothes/cloths_f_regular_16.png').default);
            this.setState({
                cloths:['cloths_f_regular_8', 'cloths_f_regular_9', 'cloths_f_regular_16']
            })
        }catch(e){
            console.error(e.message)    
        }
    }
    getHair(){
        try{
            this.load.image('hair_f_3_back', require('../assets/MAINHERO/start/hair/back/hair_f_3_back.png').default);
            this.load.image('hair_f_4_back', require('../assets/MAINHERO/start/hair/back/hair_f_4_back.png').default);
            this.load.image('hair_f_3', require('../assets/MAINHERO/start/hair/front/hair_f_3.png').default);
            this.load.image('hair_f_4', require('../assets/MAINHERO/start/hair/front/hair_f_4.png').default);
            this.setState({
                hair:['hair_f_3', 'hair_f_4', ]
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
        this.getBody(1,'white')
        this.getEmotions(1)
        this.getBody(3,'latino')
        this.getEmotions(3)
        this.getClothes()
        this.getHair()
        this.getAssets()
    }
    createHero(){
        const parent = this;
        const localDate = JSON.parse(localStorage.getItem('heroes'))       
        this.setState({
            currentStep: localDate?.currentStep||1
        })
        this.setState({
            hero_structure:{
                body:{
                    type:localDate?.mainhero_structure?.body||'body_white', 
                    link(){ 
                        this.img = parent.add.sprite(window.innerWidth/2, window.innerHeight-249,this.type).setScale(0.3).setDepth(1)
                        if(parent.state.hero_structure.emotion && parent.state.hero_structure.emotion.img){
                            parent.state.hero_structure.emotion.img.destroy()
                            if(this.type === 'body_white'){
                                parent.state.hero_structure.emotion.type = 'face_f_1_default'     
                            }
                            if(this.type === 'body_latino'){
                                parent.state.hero_structure.emotion.type = 'face_f_3_default'
                            }
                            parent.state.hero_structure.emotion.link()
                        }

                    },  
                }, 
                cloths: { 
                    type: localDate?.mainhero_structure?.cloths||'cloths_f_regular_8', 
                    link(){ this.img = parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type).setScale(0.3).setDepth(2)}, 
                },
                emotion: {
                    type:localDate?.mainhero_structure?.emotion||'face_f_1_default',
                    link(){ this.img =  parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type).setScale(0.3).setDepth(3)}, 
                },
                hair: { 
                    type:localDate?.mainhero_structure?.hair||'hair_f_3', 
                    link(){ this.img =  parent.add.image(window.innerWidth/2, window.innerHeight-249,this.type).setScale(0.3).setDepth(4)},
                },
            } 
        });
        Object.values(this.state.hero_structure).forEach((img)=> img.link())
    }
    itemChoosen(){
       
        const parent = this;
        setTimeout(()=>{
           this.scene.start('Dialog')
        },2100)
        const fadeDelay={
            body:1,
            face:0.1,
            cloths: 1.5,
            hair:2
        }
        Object.values(parent.state.hero_structure).forEach((structureItem,i)=>{
        const findedStructureItem = Object.entries(fadeDelay).find(delayItem => structureItem.type.indexOf(delayItem[0])!==-1)
            parent.tweens.add({
                targets: structureItem.img,
                alpha: 0,
                duration: findedStructureItem[1]*1000,
                ease: 'Power2'
            }, parent);
        })
        const choosen = document.createElement('div');
        choosen.innerHTML = 'Item choosen'.toUpperCase();
        choosen.style='width: 252px;height: 40px; background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%), rgba(191, 16, 90, 0.8); border: 1px solid rgba(243, 76, 116, 0.6); box-sizing: border-box; box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-bottom-left-radius:24px; border-bottom-right-radius: 24px; font-size:16px; font-family: Nunito Sans Bold; line-height: 32px; text-align:center; color:white; text-align:center'
        this.add.dom(window.innerWidth/2, window.innerHeight-450, choosen);
        if(this.itemOptions.length){
            this.itemOptions.forEach(item=>item.destroy())
            this.itemOptions=[]
        }
        if(this.left) this.left.destroy()
        if(this.right) this.right.destroy()
        if(this.home) this.home.destroy()
    }
    createChooseContainer(){
        this.chooseContainer = document.createElement('div');
        this.itemOptionsText = document.createElement('div');
        this.containerText = document.createElement('div');
        this.chooseContainer.style = "postition: relative; background: rgba(255, 255, 255, 0.8); width: 288px; height:88px; box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-radius: 12px; font-size: 20px; text-align: center; color: #141A3D; overflow:hidden; font-weight:400; font-weight:normal; font-family: Nunito Sans Bold"
        this.itemOptionsText.style = "width: 120px;height: 25px; margin:0px auto 22px; margin-bottom:20px; background: linear-gradient(180deg, #F48BB8 0%, #ED5C9A 100%);border: 1px solid #FBD4E5;box-sizing: border-box;box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15), inset 1px -2px 2px rgba(232, 131, 173, 0.25); border-bottom-left-radius:24px; border-bottom-right-radius: 24px; font-size:10px; display:flex; align-items: center; justify-content:center; color:white "
        this.itemOptionsText.innerHTML = `Choose option 1/${this.state[this.state.steps[this.state.currentStep-1]].length}`
        this.containerText.innerHTML = 'Choose your hair'
        this.chooseContainer.append(this.itemOptionsText,this.containerText)
        this.add.dom(window.innerWidth/2, window.innerHeight-148, this.chooseContainer);
    }
    createOptionsContainer(){
        const optionsContainer = document.createElement('div'); 
        optionsContainer.style = 'width: 252px; display:flex; align-items:center; justify-content:center'
        this.add.dom(window.innerWidth/2, window.innerHeight-204, optionsContainer);
    }
    createConfirmButton(){
        const parent=this;
        this.confirmButton = document.createElement('div');
        this.confirmButton.style = 'position: absolute; width:216px; height:42px; background: linear-gradient(180deg, #DB5186 0%, #C6236A 100%); border: 2px solid #D34E7E;box-sizing: border-box;box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-radius: 30px; line-height:34.5px; font-family: Nunito Sans Bold; color:white; font-size:15px; text-align:center'
        this.confirmButton.innerHTML = 'Confirm'
        this.confirmButton.onclick=()=>{ 
            this.setState({
                currentStep: parent.state.currentStep+1
            })
            this.setState({
                currentOption:1
            })
            let heroes = {
                currentStep: this.state.currentStep,
                mainhero_structure:{
                    hair:this.state.hero_structure.hair.type,
                    body:this.state.hero_structure.body.type,
                    emotion:this.state.hero_structure.emotion.type,
                    cloths:this.state.hero_structure.cloths.type,
                }
            }
            localStorage.setItem('heroes',JSON.stringify(heroes))
            if(this.state.currentStep === 4) {
                this.confirmButton.remove()
                this.chooseContainer.remove()
                this.itemChoosen()
            }
            if(this.state.currentStep !==4){
                this.createOptions()
                this.createArrows()
            }
        }
        this.add.dom(window.innerWidth/2, window.innerHeight-69, this.confirmButton);
    }
    changeCurrentOption(where){
        if(where === 'left'){
            this.setState({
                currentOption:this.state.currentOption-1
            })
        }
        if(where === 'right'){
            this.setState({
                currentOption:this.state.currentOption+1
            }) 
        }
        this.createArrows()
        this.createOptions()
    }
    changeHeroStructure(){
        const parent = this
        const currentStepName = this.state.steps[this.state.currentStep-1]
        this.state.hero_structure[currentStepName].img.destroy() 
        this.setState({
            hero_structure:{
                 ...parent.state.hero_structure,
                [currentStepName]: {...this.state.hero_structure[currentStepName],type: this.state[currentStepName][this.state.currentOption-1]},
             } 
         })
         this.state.hero_structure[currentStepName].link()
    }
    createArrows(){
        const parent = this;
        if(this.left) this.left.destroy()
        if(this.right) this.right.destroy()
        if(this.home) this.home.destroy()
        this.home = this.add.sprite(window.innerWidth/2+130, window.innerHeight-67, 'view').setInteractive();
        this.home.on('pointerdown', ()=>{
            this.setState({
                currentStep: 4
            })
            let heroes = {
                currentStep: this.state.currentStep,
                mainhero_structure:{
                    hair:this.state.hero_structure.hair.type,
                    body:this.state.hero_structure.body.type,
                    emotion:this.state.hero_structure.emotion.type,
                    cloths:this.state.hero_structure.cloths.type,
                }
            }
            localStorage.setItem('heroes',JSON.stringify(heroes))
            this.confirmButton.remove()
            this.chooseContainer.remove()
            this.itemChoosen()
        }); 
        this.left = this.add.sprite(window.innerWidth/2-130, window.innerHeight-267, 'vector').setInteractive().setScale(0.7);
        this.left.on('pointerdown', ()=>this.changeCurrentOption('left')); 
        this.right = this.add.sprite(window.innerWidth/2+130, window.innerHeight-267, 'vector').setInteractive().setScale(0.7)
        this.right.angle = 180
        this.right.on('pointerdown', ()=>this.changeCurrentOption('right')); 
        if(this.state.currentOption === 1) this.left.destroy()
        if(this.state.currentOption === this.state[this.state.steps[this.state.currentStep-1]].length) this.right.destroy()
    }
    createOptions(){
        const parent = this
        this.itemOptions.forEach(item=>item.destroy())
        this.itemOptions=[]
        let margin = -((15 * this.state[this.state.steps[this.state.currentStep-1]].length)/2)/2
       
        for(let i=0; i < this.state[this.state.steps[this.state.currentStep-1]].length; i++){
            if(i === this.state.currentOption-1){
                this.itemOptions.push(this.add.sprite(window.innerWidth/2+margin, window.innerHeight-203, 'active').setInteractive().setDepth(8).on('pointerdown', ()=>{
                    this.setState({
                        currentOption:i+1
                    }) 
                    this.createOptions()
                    this.createArrows()
                 }))
            }else{
                this.itemOptions.push(this.add.sprite(window.innerWidth/2+margin, window.innerHeight-204, 'inactive').setInteractive().setDepth(8).on('pointerdown', ()=>{
                    this.setState({
                        currentOption:i+1
                    })
                    this.createOptions() 
                    this.createArrows()
                 }))
            }
            margin+=15
        }
    
    }
    itemChosenView(){
       
    }
    create(){
        this.createHero();
        if(this.state.currentStep === 4){
            this.scene.start('Dialog')
        }
        if(this.state.currentStep !==4){
            this.createChooseContainer();
            this.createOptionsContainer();
            this.createConfirmButton();
            this.createArrows()
            this.createOptions()
        }
    }
    update(){
        if(this.state.currentStep === 4){
            console.log(true)
            //this.itemChoosen()
        }
        if(this.state.currentStep !==4){
            this.changeHeroStructure()
            this.containerText.innerHTML = `Choose your ${this.state.steps[this.state.currentStep-1]}`
            this.itemOptionsText.innerHTML = `Choose option ${this.state.currentOption}/${this.state[this.state.steps[this.state.currentStep-1]].length}`
        }
    }
} 