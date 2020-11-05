import Phaser from "phaser"
import ons2 from "../assets/ons2.json"
export default class Dialog extends Phaser.Scene {
    constructor(){
        super('Dialog')
        this.state={
            i:0,
            bg:undefined
        }
        
    }
    setState(newState){
        this.state = {...this.state,...newState}
    }
    getEmotionAssets(){
        this.load.image('angry', require('../assets/background eclipces/Angry.png').default);
        this.load.image('default', require('../assets/background eclipces/Default.png').default);
        this.load.image('flirty', require('../assets/background eclipces/Flirty.png').default);
        this.load.image('happy', require('../assets/background eclipces/Happy.png').default);
        this.load.image('sad', require('../assets/background eclipces/Sad.png').default);
        this.load.image('shy', require('../assets/background eclipces/Shy.png').default);
        this.load.image('surprised', require('../assets/background eclipces/Surprised.png').default);
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
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'white_background').setDepth(9)
        this.frame= this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg').setDepth(10)
    }
    createFrameWithTitle(type){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+148, 'white_background').setDepth(9)
        this.frameWithTitle = type === 'reflect' ? 
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10).setFlip(true,false) :
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10)

     }
    createText(text){
        this.label = this.add.text(window.innerWidth/2-148, window.innerHeight/2+105, '', {
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
    move(who,side,isReflect){
        let i = 0
        this.time.addEvent({
            callback: () => {
                if(side === 'right' && !isReflect){
             
                    Object.values(this.state[who]).forEach(item=> item.img.x+=i)
                    this.state[who][this.state[`${who}_key`]].bg_emotion.img.x+=i
                    this.state[who][this.state[`${who}_key`]].checker.img.x+=i
                    ++i
                }
                if(side === 'left' && !isReflect){
               
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
       if(this.state.i<10){
           setTimeout(()=>{
                parent.runDialog()
           },4000)
       }
    }
    addBackground(bg){
        this.background = this.add.image(window.innerWidth/2, window.innerHeight/2, bg)
    }
    runDialog(){  
        const parent = this
        console.log(this.state.i)
        if(ons2[this.state.i].backgroundName){
            if(this.background) this.background.destroy()
            this.addBackground(ons2[this.state.i].backgroundName)
            this.setState({bg: ons2[this.state.i].backgroundName})
        }
        if(ons2[this.state.i].type === 'middle'){
            if(this.ellipses) this.ellipses.forEach(item=>item.destroy())
            if(this.frameBackground) this.frameBackground.destroy()
            if(this.frameWithTitle) this.frameWithTitle.destroy()
            if(this.title) this.title.destroy()
            if(this.label) this.label.destroy()
            this.createFrame()
            this.createText(ons2[this.state.i].text)
        }
        if(ons2[this.state.i].character === 'MAINHERO'){
            if(this.ellipses) this.ellipses.forEach(item=>item.destroy())
            if(this.frameBackground) this.frameBackground.destroy()
            if(this.frameWithTitle) this.frameWithTitle.destroy()
            if(this.frame) this.frame.destroy()
            if(this.title) this.title.destroy()
            if(this.label) this.label.destroy()
            console.log(this.state)
            Object.values(this.state.mainhero).forEach(item=> item.img.destroy())
            this.state.mainhero[this.state.mainhero_key].checker.img.destroy()
            this.state.mainhero[this.state.mainhero_key].bg_emotion.img.destroy()
            this.setState({
                mainhero:{
                    hair:parent.state.mainhero.hair.type,
                    body:parent.state.mainhero.body.type,
                    emotion: 'face_f_1_'+ons2[parent.state.i].emotion,
                    cloths:parent.state.mainhero.cloths.type,
                }
            })
            this.createHero('mainhero')
            this.createFrameWithTitle()
            this.addTitle('Hero')
            this.createText(ons2[this.state.i].text)
            if(ons2[this.state.i].type === 'left'){
                if(ons2[this.state.i].boxType === 'thought'){
                    this.createEclipces()
                }
                this.move('mainhero', 'right')
                setTimeout(()=>{
                    this.move('mainhero','left')
                },2000)
            }
        }
        this.save()
    }
    create(){
        const parent= this
        this.preloadHeros()
        this.createHero('mainhero')  
        this.createHero('russell','reflect')
        //this.createFrameWithTitle()
        //this.addTitle('asdfsad', )
        //this.createFrameWithTitle()
        //this.createEclipces('phone')
       // this.createText('lanayafsafjs sadkf jasd fasdk faskjd k')
        //setTimeout(()=>{
            //parent.state.mainhero[parent.state.mainhero_key].bg_emotion.img.destroy()
            //this.go()
        //},4000)
        //b.animations.add('run')
        //b.animations.play('run', 15, true);
        //console.log(b.animations)
        //b.play('jump')
        //this.go()
        //this.go()
        this.runDialog()
    } 
    update(){
        
    }  
} 