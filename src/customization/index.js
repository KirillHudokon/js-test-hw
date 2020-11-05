import Phaser from "phaser"
const initialState = {
    steps:['body', 'hair', 'cloths'],
    currentStep:1,
    currentOption:1
}
export default class Customization extends Phaser.Scene {
    constructor(){
        super('Customization')
        this.state = initialState
        this.setState = this.setState.bind(this)
        this.itemPositionView;
        this.itemSelectionTypeInfo;
        this.itemOptions=[]
    }
    setState(newState){
        this.state = {...this.state,...newState}
    }
    resetState(){
        this.state = initialState
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
    getExtraAssetsForCustomization(){
        this.load.image('arrow', require('../assets/customization/Vector.png').default);
        this.load.image('finish', require('../assets/customization/view.png').default);
        this.load.image('inactive', require('../assets/customization/inActive.png').default);
        this.load.image('active', require('../assets/customization/active.png').default);
        this.load.image('customization_bg', require('../assets/Backgrounds/customization_bg.jpg').default);
    }
    preload(){
        this.getBody(1,'white')
        this.getEmotions(1)
        this.getBody(3,'latino')
        this.getEmotions(3)
        this.getClothes()
        this.getHair()
        this.getExtraAssetsForCustomization()
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
                        this.img = parent.add.sprite(window.innerWidth/2, window.innerHeight/2,this.type).setScale(0.4).setDepth(1)
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
                    link(){ this.img = parent.add.image(window.innerWidth/2, window.innerHeight/2,this.type).setScale(0.4).setDepth(2)}, 
                },
                emotion: {
                    type:localDate?.mainhero_structure?.emotion||'face_f_1_default',
                    link(){ this.img =  parent.add.image(window.innerWidth/2, window.innerHeight/2,this.type).setScale(0.4).setDepth(3)}, 
                },
                hair: { 
                    type:localDate?.mainhero_structure?.hair||'hair_f_3', 
                    link(){ this.img =  parent.add.image(window.innerWidth/2, window.innerHeight/2,this.type).setScale(0.4).setDepth(4)},
                },
            } 
        });
        Object.values(this.state.hero_structure).forEach((img)=> img.link())
    }
    choosenHeroView(){
      
            this.itemOptions.forEach(item => item.destroy())
            this.itemOptions=[]
            this.choosenHeroTitle = document.createElement('div');
            this.choosenHeroTitle.innerHTML = 'Item choosen'.toUpperCase();
            this.choosenHeroTitle.className='choosenHeroTitle'
            this.add.dom(window.innerWidth/2, window.innerHeight/2-315, this.choosenHeroTitle);
            if(this.itemOptions.length){
                this.itemOptions.forEach(item=>item.destroy())
                this.itemOptions=[]
            }
            if(this.left) this.left.destroy()
            if(this.right) this.right.destroy()
            if(this.finish) this.finish.destroy()
            const fadeDelay={
                body:1,
                face:0.1,
                cloths: 1.5,
                hair:2
            }
            Object.values(this.state.hero_structure).forEach((structureItem,i)=>{
            const findedStructureItem = Object.entries(fadeDelay).find(delayItem => structureItem.type.indexOf(delayItem[0])!==-1)
            this.tweens.add({
                    targets: structureItem.img,
                    alpha: 0,
                    duration: findedStructureItem[1]*1000,
                    ease: 'Power2'
                }, this);
            })
            setTimeout(()=>{
                this.choosenHeroTitle.remove()
                this.resetState()
                this.scene.start('Dialog')
            },2100)
        
    }
    createItemSelectionInfoView(){
        this.itemSelectionInfoView = document.createElement('div');
        this.itemPositionView = document.createElement('div');
        this.itemSelectionTypeInfo = document.createElement('div');
        this.itemSelectionInfoView.className = "itemSelectionInfoView"
        this.itemPositionView.className = "itemPositionView"
        this.itemPositionView.innerHTML = `Choose option 1/${this.state[this.state.steps[this.state.currentStep-1]].length}`
        this.itemSelectionTypeInfo.innerHTML = 'Choose your hair'
        this.itemSelectionInfoView.append(this.itemPositionView,this.itemSelectionTypeInfo)
        this.add.dom(window.innerWidth/2, window.innerHeight/2 + 190, this.itemSelectionInfoView);
    }
    createConfirmButton(){
        const parent=this;
        this.confirmButton = document.createElement('div');
        this.confirmButton.className = 'confirmButton'
        this.confirmButton.innerHTML = 'Confirm'
        this.confirmButton.onclick=()=>{ 
            this.setState({
                currentStep: parent.state.currentStep+1
            })
            this.setState({
                currentOption:1
            })
            localStorage.setItem('heroes',JSON.stringify(this.getHeroStructure()))
            if(this.state.currentStep === 4) {
                this.confirmButton.remove()
                this.itemSelectionInfoView.remove()
                this.choosenHeroView()
            }
            if(this.state.currentStep !==4){
                this.createOptions()
                this.createArrows()
            }
        }
        this.add.dom(window.innerWidth/2, window.innerHeight/2+280, this.confirmButton);
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
    getHeroStructure(){
        return {
            currentStep: this.state.currentStep,
            mainhero_structure:{
                hair:this.state.hero_structure.hair.type,
                body:this.state.hero_structure.body.type,
                emotion:this.state.hero_structure.emotion.type,
                cloths:this.state.hero_structure.cloths.type,
            }
        }
    }
    createArrows(){
        if(this.left) this.left.destroy()
        if(this.right) this.right.destroy()
        if(this.finish) this.finish.destroy()
        this.finish = this.add.sprite(window.innerWidth/2+130, window.innerHeight/2+280, 'finish').setInteractive();
        this.finish.on('pointerdown', ()=>{
            this.setState({
                currentStep: 4
            })
            localStorage.setItem('heroes',JSON.stringify(this.getHeroStructure()))
            this.confirmButton.remove()
            this.itemSelectionInfoView.remove()
            this.choosenHeroView()
        }); 
        this.left = this.add.sprite(window.innerWidth/2-160, window.innerHeight/2, 'arrow').setInteractive().setScale(0.7);
        this.left.on('pointerdown', ()=>this.changeCurrentOption('left')); 
        this.right = this.add.sprite(window.innerWidth/2+160, window.innerHeight/2, 'arrow').setInteractive().setScale(0.7)
        this.right.angle = 180
        this.right.on('pointerdown', ()=>this.changeCurrentOption('right')); 
        if(this.state.currentOption === 1) this.left.destroy()
        if(this.state.currentOption === this.state[this.state.steps[this.state.currentStep-1]].length) this.right.destroy()
    }
    createOptions(){
        this.itemOptions.forEach(item=>item.destroy())
        this.itemOptions=[]
        let margin = -((15 * this.state[this.state.steps[this.state.currentStep-1]].length)/2)/2
       
        for(let i=0; i < this.state[this.state.steps[this.state.currentStep-1]].length; i++){
            if(i === this.state.currentOption-1){
                this.itemOptions.push(this.add.sprite(window.innerWidth/2+margin, window.innerHeight/2+131, 'active').setInteractive().setDepth(8).on('pointerdown', ()=>{
                    this.setState({
                        currentOption:i+1
                    }) 
                    this.createOptions()
                    this.createArrows()
                 }))
            }else{
                this.itemOptions.push(this.add.sprite(window.innerWidth/2+margin, window.innerHeight/2+130, 'inactive').setInteractive().setDepth(8).on('pointerdown', ()=>{
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
    addBackground(){
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'customization_bg')
    }
    create(){
        this.createHero()
        if(this.state.currentStep === 4){
            this.resetState()
            this.scene.start('Dialog')
        }else{
            this.addBackground()
            this.createItemSelectionInfoView();
            this.createConfirmButton();
            this.createArrows()
            this.createOptions()
        }
        
    }
    update(){
        if(this.state.currentStep !==4){
            this.changeHeroStructure()
            this.itemSelectionTypeInfo.innerHTML = `Choose your ${this.state.steps[this.state.currentStep-1]}`
            this.itemPositionView.innerHTML = `Choose option ${this.state.currentOption}/${this.state[this.state.steps[this.state.currentStep-1]].length}`
        }
    }
} 