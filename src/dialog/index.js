import Phaser from "phaser"
import ons2 from "../assets/ons2.json"
export default class Dialog extends Phaser.Scene {
    constructor(){
        super('Dialog')
        this.state={
            i:0 ,
            bg:undefined
        }
        this.timeMove;
        this.timeNextScene;
        
    }
    setState(newState){
        this.state = {...this.state,...newState}
    }
    getEmotionAssets(){
        const emotions = ['angry', 'default', 'flirty', 'happy', 'sad', 'shy', 'surprised'];
        emotions.forEach(emotion => {
            try{
                const name = emotion
                const path = require(`../assets/background eclipces/${emotion[0].toUpperCase()}${emotion.slice(1)}.png`).default
                this.load.image(name, path);
            }catch(e){
                console.error(e.message)     
            }
        })
        this.load.image('vision', require('../assets/background eclipces/Default.png').default);
    }
    getDialogAssets(){
        this.load.image('bg_with_title', require('../assets/dialog/bg_with_title.png').default);
        this.load.image('bg', require('../assets/dialog/bg.png').default);
        this.load.image('home', require('../assets/dialog/home.png').default);
        this.load.image('bgphone_with_title', require('../assets/dialog/bgphone_with_title.png').default);
        this.load.image('background_ons-lux-party-balcony-7', require('../assets/Backgrounds/ons-lux-party-balcony-7.jpg').default)
        this.load.image('background_ons-lux-party-hall-6', require('../assets/Backgrounds/ons-lux-party-hall-6.jpg').default)
        this.load.image('background_ons-ms-apartment-bedroom-5', require('../assets/Backgrounds/ons-ms-apartment-bedroom-5.jpg').default)
        this.load.image('white_background', require('../assets/dialog/white_background.png').default )
        this.load.image('ellipse', require('../assets/dialog/Ellipse.png').default )
        this.load.image('phone', require('../assets/dialog/phone_bubble.png').default )
        this.load.image('home', require('../assets/dialog/home.png').default)
    }
    getRussellAssets(){
        const emotions = ['angry', 'default', 'joy', 'sad', 'shy', 'surprised'];
        emotions.forEach(emotion => {
            try{
            const name = `face_m_1_${emotion}`
            const path = require(`../assets/Russell/emotions/face_m_1_${emotion}.png`).default
            this.load.image(name, path);
            }catch(e){
               console.error(e.message)     
            }
        })
        this.load.image('hair_m_4', require('../assets/Russell/hair/hair_m_4.png').default )
        this.load.image('hair_m_4_back', require('../assets/Russell/hair/hair_m_4_back.png').default )
        this.load.image('cloths_m_regular_6', require('../assets/Russell/cloths_m_regular_6.png').default )
        this.load.image('body_russell', require('../assets/Russell/face_m_1_body_m_regular_white_1.png').default )
    }
    getJSON(){
        this.load.text('dialog', '../assets/ons2.json');
    }
    loadScene(){
        const dialog = JSON.parse(localStorage.getItem('heroes'))?.dialog  
        const bg = JSON.parse(localStorage.getItem('heroes'))?.bg 
        if(dialog){
            this.setState({
                 i:dialog-1
            })
        }
        if(bg){
            this.setState({
                bg
            })
            this.addBackground(bg)
        }
    }
    preload(){
        this.getEmotionAssets()
        this.getDialogAssets()
        this.getRussellAssets()
    }
    preloadHeros(){
        const mainhero = JSON.parse(localStorage.getItem('heroes'))?.mainhero_structure  
        const russell = JSON.parse(localStorage.getItem('heroes'))?.russell_structure  
        this.setState({
            mainhero
        })
  
        this.setState({
            russell: russell ? russell : {
                emotion: 'face_m_1_default',
                cloths:'cloths_m_regular_6',
                hair:'hair_m_4',
                body:'body_russell',
            }
        })
    

    }
    createHero(who,type){
        const parent = this
        const hero_structure = this.state[who]
        
        const bgEmotionName = hero_structure.emotion.split('_')
        const x = type === 'reflect' ? window.innerWidth/2+280 : window.innerWidth/2-280;
        const y =window.innerHeight/2+10;
        let sup = Symbol("sup");
        this.setState({
            [`${who}_key`]:sup
        })
        this.setState({
            [who]:{
                ...this.state[who],
                [sup]:{
                    bg_emotion:{
                        link(){
                            this.img = type === 'reflect' ? 
                            parent.make.image({
                                x,
                                y,
                                key: bgEmotionName[bgEmotionName.length-1],
                                add: true
                            }).setScale(0.3).setDepth(1).setFlip(true,false) : 
                            parent.make.image({
                                x,
                                y,
                                key: bgEmotionName[bgEmotionName.length-1],
                                add: true
                            }).setScale(0.3).setDepth(1)
                        }
                    }
                }
            }
        })
    
        this.setState({
            [who]:{
                ...this.state[who],
                body:{
                    type:hero_structure.body,
                    link(){ 
                        this.img = type === 'reflect' ?
                            parent.make.image({
                                x,
                                y,
                                key: hero_structure.body,
                                add: true
                            }).setScale(0.3).setDepth(2).setFlip(true,false) :
                            parent.make.sprite({
                                x,
                                y,
                                key: hero_structure.body,
                                add: true
                            }).setScale(0.3).setDepth(2)
                    }, 
                }, 
                cloths: { 
                    type:hero_structure.cloths,
                    link(){ 
                        this.img = type === 'reflect' ?
                        parent.make.image({
                            x,
                            y,
                            key: hero_structure.cloths,
                            add: true
                        }).setScale(0.3).setDepth(3).setFlip(true,false) :
                        parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.cloths,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    }, 
                },
                emotion: {
                    type:hero_structure.emotion,
                    link(){ 
                        this.img = type === 'reflect' ?
                        parent.make.image({
                            x,
                            y,
                            key: hero_structure.emotion,
                            add: true
                        }).setScale(0.3).setDepth(4).setFlip(true,false) :
                        parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.emotion,
                            add: true
                        }).setScale(0.3).setDepth(4)
                    }, 
                },
                hair: { 
                    type:hero_structure.hair,
                    link(){ 
                        this.img = type === 'reflect' ?
                        parent.make.image({
                            x,
                            y,
                            key: hero_structure.hair,
                            add: true
                        }).setScale(0.3).setDepth(5).setFlip(true,false) :
                        parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.hair,
                            add: true
                        }).setScale(0.3).setDepth(5)
                    },
                },
            } 
        }); 
        
        this.setState({
            [who]:{
                ...this.state[who],
                [sup]:{
                    ...parent.state[who][sup],
                    checker:{
                        link(){
                            this.img = type === 'reflect' ? 
                            parent.make.sprite({
                                x:x-16,
                                y:y-50,
                                key: 'vision',
                                add: false
                            }).setScale(0.40) : 
                            parent.make.sprite({
                                x:x+23,
                                y:y-50,
                                key: 'vision',
                                add: false
                            }).setScale(0.40);
                        }
                    }
                }
            }
        })
  
        this.state[who][sup].bg_emotion.link()
        this.state[who][sup].checker.link()
        this.state[who][sup].checker.img.angle = 45
       
        Object.values(this.state[who]).forEach(item=> item.link())
        Object.values(this.state[who]).forEach((item)=>{
            item.img.mask = new Phaser.Display.Masks.BitmapMask(this, this.state[who][sup].checker.img);
        })
    }
    createFrame(){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'white_background').setDepth(9)
        this.frame= this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'bg').setDepth(10)
    }
    createFrameWithTitle(type){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+148, 'white_background').setDepth(9)
        this.frameWithTitle = type === 'reflect' ? 
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10).setFlip(true,false) :
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10)

     }
    createText(text){
        this.label = this.add.text(window.innerWidth/2-148,this.frame ? window.innerHeight/2-40  : window.innerHeight/2+105 , '', {
            align:'center', 
            color:'#141A3D', 
            fontFamily: 'Nunito Sans Bold',
            fontSize:'17px'
        }).setWordWrapWidth(300,false).setDepth(11)
        
        this.typewriteText(text)
    }
    createEclipces(type){
        if(type==='reflect'){
            this.ellipses = [
                this.add.sprite(window.innerWidth/2+82, window.innerHeight/2+90, 'ellipse').setScale(2.8).setDepth(11),
                this.add.sprite(window.innerWidth/2+100, window.innerHeight/2+70, 'ellipse').setScale(1.4).setDepth(11),
                this.add.sprite(window.innerWidth/2+110, window.innerHeight/2+57, 'ellipse').setDepth(11)
            ]
        }else if(type==='phone'){
            this.ellipses = [
                this.add.sprite(window.innerWidth/2-82, window.innerHeight/2+90, 'phone').setDepth(11),
                this.add.sprite(window.innerWidth/2-100, window.innerHeight/2+70, 'ellipse').setDepth(11),
                this.add.sprite(window.innerWidth/2-110, window.innerHeight/2+57, 'ellipse').setScale(0.7).setDepth(11)
            ]
        }else if(type==='phone reflect'){
            this.ellipses = [
                this.add.sprite(window.innerWidth/2+82, window.innerHeight/2+90, 'phone').setDepth(11),
                this.add.sprite(window.innerWidth/2+100, window.innerHeight/2+70, 'ellipse').setDepth(11),
                this.add.sprite(window.innerWidth/2+110, window.innerHeight/2+57, 'ellipse').setScale(0.7).setDepth(11)
            ]
        }else{
            this.ellipses = [
                this.add.sprite(window.innerWidth/2-82, window.innerHeight/2+90, 'ellipse').setScale(2.8).setDepth(11),
                this.add.sprite(window.innerWidth/2-100, window.innerHeight/2+70, 'ellipse').setScale(1.4).setDepth(11),
                this.add.sprite(window.innerWidth/2-110, window.innerHeight/2+57, 'ellipse').setDepth(11)
            ]
        }
    }
    addTitle(text = '', type){
        const titleConfig = {
            align:'center', 
            color:'white', 
            fontSize:'20px',
            fontFamily: 'Arial'
        }
        this.title = type === 'reflect' ? 
            this.add.text(window.innerWidth/2-100, window.innerHeight/2+78, text, titleConfig).setDepth(11):
            this.add.text(window.innerWidth/2+35, window.innerHeight/2+78, text, titleConfig).setDepth(11)
     
    }
     typewriteText(text){   
        const length = text.length
        let i = 0
         this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 5
        })
        
    }
    move(who,side){
        let i = 0
        this.time.addEvent({
            callback: () => {
                if(side === 'right' ){
             
                    Object.values(this.state[who]).forEach(item=> item.img.x+=i)
                    this.state[who][this.state[`${who}_key`]].bg_emotion.img.x+=i
                    this.state[who][this.state[`${who}_key`]].checker.img.x+=i
                    ++i
                }
                if(side === 'left' ){
               
                    Object.values(this.state[who]).forEach(item=> item.img.x+=i)
                    this.state[who][this.state[`${who}_key`]].bg_emotion.img.x+=i
                    this.state[who][this.state[`${who}_key`]].checker.img.x+=i
                    --i
                }

            },
            repeat: 20,
            delay: 10
        })
    }
    cameraMove(side){
        let i = 0
        this.time.addEvent({
            callback: () => {
                if(side === 'right' ){
                    this.cameras.main.scrollX+=i  
                    ++i
                }
                if(side === 'left' ){      
                 this.cameras.main.scrollX+=i 
                    --i
                }
            },
            repeat: 5,
            delay: 10
        })
    }
    save(){
        const parent = this
        this.setState({
            i:this.state.i+1
        })
        let heroes = {
            currentStep: JSON.parse(localStorage.getItem('heroes')).currentStep,
            bg:this.state.bg,
            dialog:parent.state.i,
            mainhero_structure:{
                hair:parent.state.mainhero.hair.type,
                body:parent.state.mainhero.body.type,
                emotion:parent.state.mainhero.emotion.type,
                cloths:parent.state.mainhero.cloths.type,
            },
            russell_structure:{
                hair:parent.state.russell.hair.type,
                body:parent.state.russell.body.type,
                emotion:parent.state.russell.emotion.type,
                cloths:parent.state.russell.cloths.type,
            }
        }
       localStorage.setItem('heroes',JSON.stringify(heroes))
       if(this.state.i<ons2.length){
           this.timeNextScene = setTimeout(()=>{
                parent.runDialog()
           },4000)
       }
    }
    addBackground(bg){
        this.background = this.add.image(window.innerWidth/2, window.innerHeight/2, bg)
    }
    restartGame(){
        const parent = this
        this.home = this.add.sprite(window.innerWidth/2-120, window.innerHeight/2-300, 'home').setInteractive();
        this.home.on('pointerdown', ()=>{
            clearTimeout(parent.timeMove)
            clearTimeout(parent.timeNextScene)
            this.setState({
                i:0,
            })
            this.setState({
                bg:undefined
            })
            localStorage.removeItem('heroes')
            parent.scene.start('Customization')
        }).setDepth(15); 
    }
    runDialog(){  
        const parent = this
        const chooseEmotion = (hero) => {
            if(hero === 'mainhero'){
                if(parent.state[hero].body.type === 'body_latino') return 'face_f_3_'+ons2[parent.state.i].emotion
                if(parent.state[hero].body.type === 'body_white') return 'face_f_1_'+ons2[parent.state.i].emotion
            } 
            return 'face_m_1_'+ons2[parent.state.i].emotion 
        }
        if(ons2[this.state.i].backgroundName){
            if(this.background) this.background.destroy()
            this.addBackground(ons2[this.state.i].backgroundName)
            this.setState({bg: ons2[this.state.i].backgroundName})
        }
        if(ons2[this.state.i].type === 'middle'){
            this.cameras.main.offsetX=0
            if(this.ellipses) this.ellipses.forEach(item=>item.destroy())
            if(this.frameBackground) this.frameBackground.destroy()
            if(this.frame){
                this.frame.destroy()
                this.frame = null
            } 
            if(this.frameWithTitle) this.frameWithTitle.destroy()
            if(this.title) this.title.destroy()
            if(this.label) this.label.destroy()
            this.createFrame()
            this.createText(ons2[this.state.i].text)
        }
        if(ons2[this.state.i].character){
            const hero = ons2[this.state.i].character.toLowerCase()
            if(this.ellipses) this.ellipses.forEach(item=>item.destroy())
            if(this.frameBackground) this.frameBackground.destroy()
            if(this.frameWithTitle) this.frameWithTitle.destroy()
            if(this.frame){
                this.frame.destroy()
                this.frame = null
            } 
            if(this.title) this.title.destroy()
            if(this.label) this.label.destroy()
            Object.values(this.state[hero]).forEach(item=> item.img.destroy())
            this.state[hero][this.state[`${hero}_key`]].checker.img.destroy()
            this.state[hero][this.state[`${hero}_key`]].bg_emotion.img.destroy()
            this.setState({
                [hero]:{
                    hair:parent.state[hero].hair.type,
                    body:parent.state[hero].body.type,
                    emotion: chooseEmotion(hero) ,
                    cloths:parent.state[hero].cloths.type,
                }
            })

            if(ons2[this.state.i].type === 'left'){
                this.createHero(hero)
                this.createFrameWithTitle()
                this.addTitle(hero)
                if(ons2[this.state.i].boxType === 'phone'){
                    this.createEclipces('phone')
                }else{
                    this.createEclipces()
                }
                this.cameraMove('left')
                this.move(hero, 'right', )
                this.timeMove = setTimeout(()=>{
                    this.cameraMove('right')
                    this.move(hero,'left')
                },2000)
            }
            if(ons2[this.state.i].type === 'right'){
                this.createHero(hero,'reflect')
                this.createFrameWithTitle('reflect')
                this.addTitle(hero, 'reflect')
                if(ons2[this.state.i].boxType === 'phone'){
                    this.createEclipces('phone reflect')
                }else{
                    this.createEclipces('reflect')
                }
                this.move(hero, 'left')
                this.cameraMove('right')
                this.timeMove = setTimeout(()=>{
                    this.move(hero,'right')
                    this.cameraMove('left')
                },2000)
            }
            
            this.createText(ons2[this.state.i].text)
        }
        this.save()
    }
    create(){
        this.loadScene()
        this.preloadHeros()
        this.createHero('mainhero')  
        this.createHero('russell','reflect')
        this.runDialog()
        this.restartGame()
    } 
    update(){
        
    }  
} 