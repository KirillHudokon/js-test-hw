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
        this.load.image('mob_bubble', require('../assets/dialog/mob_bubble.png').default);
    }

    preload(){
        this.getEmotionAssets()
        this.getDialogAssets()
       
    }
    createHero(){
        const parent = this
        const hero_structure = JSON.parse(localStorage.getItem('hero_customization'))?.hero_structure  
        const bgEmotionName = hero_structure.emotion.split('_')
  
        this.bg_emotion = this.make.image({
            x: 1500 / 2,
            y: 800/ 2,
            key: bgEmotionName[bgEmotionName.length-1],
            add: true
        }).setScale(0.3).setDepth(1)

        this.setState({
            mainhero:{
                body:{
                    link(){ 
                        this.img = parent.make.sprite({
                            x: 1500 / 2,
                            y: 800/ 2,
                            key: hero_structure.body,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    }, 
                }, 
                cloths: { 
                    link(){ 
                        this.img = parent.make.sprite({
                            x: 1500 / 2,
                            y: 800/ 2,
                            key: hero_structure.cloths,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    }, 
                },
                emotion: {
                    link(){ 
                        this.img = parent.make.sprite({
                            x: 1500 / 2,
                            y: 800/ 2,
                            key: hero_structure.emotion,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    }, 
                },
                hair: { 
                    link(){ 
                      this.img = parent.make.sprite({
                            x: 1500 / 2,
                            y: 800/ 2,
                            key: hero_structure.hair,
                            add: true
                        }).setScale(0.3).setDepth(3)
                    },
                },
            } 
        });

        
        const checker = this.make.sprite({
            x: 1544 / 2, // 1544 1468(flip) .setFlip(true,false);(all)
            y: 700/ 2,
            key: 'vision',
            add: false
        }).setScale(0.40);
        checker.angle = 45
        Object.values(this.state.mainhero).forEach((item)=> item.link())
        Object.values(this.state.mainhero).forEach((item)=>{
            item.img.mask = new Phaser.Display.Masks.BitmapMask(this, checker);
        })
    }
    
    create(){
        //this.createHero()
    }
} 