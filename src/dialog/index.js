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
        this.load.image('mob_bubble', require('../assets/dialog/mob_bubble.png').default);
        this.load.image('background', require('../assets/Backgrounds/ons-lux-party-balcony-7.jpg').default)
        this.load.image('white_background', require('../assets/dialog/white_background.png').default )
        this.load.image('ellipse', require('../assets/dialog/Ellipse.png').default )
    }

    preload(){
        this.getEmotionAssets()
        this.getDialogAssets()
       
    }
    createHero(){
        const parent = this
        const hero_structure = JSON.parse(localStorage.getItem('hero_customization'))?.hero_structure  
        const bgEmotionName = hero_structure.emotion.split('_')
        const x =window.innerWidth/2-120;
        const y =window.innerHeight/2+10;
        this.bg_emotion = this.make.image({
            x,
            y,
            key: bgEmotionName[bgEmotionName.length-1],
            add: true
        }).setScale(0.3).setDepth(1)

        this.setState({
            mainhero:{
                body:{
                    link(){ 
                        this.img = parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.body,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    }, 
                }, 
                cloths: { 
                    link(){ 
                        this.img = parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.cloths,
                            add: true
                        }).setScale(0.3).setDepth(4)
                    }, 
                },
                emotion: {
                    link(){ 
                        this.img = parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.emotion,
                            add: true
                        }).setScale(0.3).setDepth(5)
                    }, 
                },
                hair: { 
                    link(){ 
                      this.img = parent.make.sprite({
                            x,
                            y,
                            key: hero_structure.hair,
                            add: true
                        }).setScale(0.3).setDepth(6)
                    },
                },
            } 
        });

        
        const checker = this.make.sprite({
            x:x+23,// 1544 1468(flip) .setFlip(true,false);(all)
            y:y-50,
            key: 'vision',
            add: false
        }).setScale(0.40);
        checker.angle = 45
        Object.values(this.state.mainhero).forEach((item)=> item.link())
        Object.values(this.state.mainhero).forEach((item)=>{
            item.img.mask = new Phaser.Display.Masks.BitmapMask(this, checker);
        })
    }
    createFrame(){
        this.frame = document.createElement('div');
        this.frameText = document.createElement('div');
        this.frame.style = "width:332px; height:124px; border-radius:20px;  background: linear-gradient(132.91deg, rgba(255, 255, 255, 0.09) 31.51%, rgba(255, 255, 255, 0) 42.57%), #C62D6E; border: 2px solid #DC4D81; box-sizing: border-box; box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15); padding:10px; box-sizing:border-box;" 
        this.frameText.style = " width: 100%; height: 100%; background: #FFFFFF; border: 2px solid rgba(0, 0, 0, 0.1); box-sizing: border-box; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12); border-radius: 14px;"
        this.frame.append(this.frameText)
        this.add.dom(window.innerWidth/2, window.innerHeight-148, this.frame);
    }
    createFrameWithTitle(){
        this.frameBackground= this.add.sprite(window.innerWidth/2, window.innerHeight/2+148, 'white_background').setDepth(9)
        this.frameWithTitle = this.add.sprite(window.innerWidth/2, window.innerHeight/2+142, 'bg_with_title').setDepth(10)
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
    createEclipces(){
        
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
        this.createHero()
        ///this.createFrameWithTitle()
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'background')
        this.frameWithTitle()
        this.ellipses = [this.add.sprite(window.innerWidth/2-82, window.innerHeight/2+90, 'ellipse').setScale(2.8).setDepth(11),
        this.add.sprite(window.innerWidth/2-100, window.innerHeight/2+70, 'ellipse').setScale(1.4).setDepth(11),
        this.add.sprite(window.innerWidth/2-110, window.innerHeight/2+57, 'ellipse').setDepth(11)]
        
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
        this.createText('lanayafsafjs sadkf jasd fasdk faskjd k')
        
    }   
} 