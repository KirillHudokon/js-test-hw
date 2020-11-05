import Phaser from "phaser"

export default class Dialog extends Phaser.Scene {
    constructor(){
        super('Dialog')
        this.state={}
       
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
        this.load.image('background', require('../assets/Backgrounds/ons-lux-party-balcony-7.jpg').default)
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

    preload(){
        this.getEmotionAssets()
        this.getDialogAssets()
        this.getRussellAssets()
    }
    preloadHeros(){
        const mainhero = JSON.parse(localStorage.getItem('mainhero_customization'))?.hero_structure  
        const russell = JSON.parse(localStorage.getItem('russell_customization'))?.hero_structure  
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
        console.log(hero_structure,11)
        const bgEmotionName = hero_structure.emotion.split('_')
        const x = type === 'reverse' ? window.innerWidth/2+80 : window.innerWidth/2-80;
        const y =window.innerHeight/2+10;
        this.bg_emotion = type === 'reverse' ? 
            this.make.image({
                x,
                y,
                key: bgEmotionName[bgEmotionName.length-1],
                add: true
            }).setScale(0.3).setDepth(1).setFlip(true,false) : 
            this.make.image({
                x,
                y,
                key: bgEmotionName[bgEmotionName.length-1],
                add: true
            }).setScale(0.3).setDepth(1)

        this.setState({
            [who]:{
                body:{
                    type:hero_structure.body,
                    link(){ 
                        this.img = type === 'reverse' ?
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
                        this.img = type === 'reverse' ?
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
                        this.img = type === 'reverse' ?
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
                        this.img = type === 'reverse' ?
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
        

        
        const checker = type === 'reverse' ? 
            this.make.sprite({
                x:x-16,
                y:y-50,
                key: 'vision',
                add: false
            }).setScale(0.40) : 
            this.make.sprite({
                x:x+23,
                y:y-50,
                key: 'vision',
                add: false
            }).setScale(0.40);
        checker.angle = 45
        Object.values(this.state[who]).forEach((item)=> item.link())
        Object.values(this.state[who]).forEach((item)=>{
            item.img.mask = new Phaser.Display.Masks.BitmapMask(this, checker);
        })
    }
    createFrame(){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'white_background').setDepth(9)
        this.frameWithTitle = this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg').setDepth(10)
    }
    createFrameWithTitle(type){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+148, 'white_background').setDepth(9)
        this.frameWithTitle = type === 'reflect' ? 
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10).setFlip(true,false) :
            this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10)

     }
    createText(text){
        this.label = this.add.text(window.innerWidth/2-148, window.innerHeight/2+110, '', {
            align:'center', 
            color:'#141A3D', 
            fontFamily: 'Nunito Sans Bold',
            fontSize:'18px'
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

    create(){
        this.preloadHeros()
    
     
        this.createHero('mainhero')
     
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'background')
        this.createFrameWithTitle()
        this.addTitle('asdfsad', )
        //this.createFrameWithTitle()
        this.createEclipces('phone')
        this.createText('lanayafsafjs sadkf jasd fasdk faskjd k')
        //this.time.addEvent({
           // callback: () => {
              //  b.x+=1
           // },
           // repeat: 100,
           // delay: 5
        //})
        //b.animations.add('run')
        //b.animations.play('run', 15, true);
        //console.log(b.animations)
        //b.play('jump')
      
        
    }   
} 