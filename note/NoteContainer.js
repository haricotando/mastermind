import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import Utils from '../helper/Utils.js';
import { NoteBuffer } from './NoteBuffer.js';
import { NoteNumber } from './NoteNumber.js';


export class NoteContainer extends PIXI.Container {
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();

        this.bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, false, true));
        this.bg.tint = dataProvider.data.colorDark;
        this.bg.pivot.x = this.bg.width/2;
        this.bg.alpha = 0.7;
        this.bg.interactive = true;
        this.bg.visible = false;

        this.bg.on('touchstart', (event) => {
            this.bg.interactive = false;
            this.hide();
        });

        this.container = this.addChild(new PIXI.Container());
        this.dialog = new PIXI.Graphics();
        this.dialog.beginFill(dataProvider.data.colorLight);
        this.dialog.drawRoundedRect(0, 0, window.innerWidth-(dataProvider.data.standalone ? 0 : 40), 900, 120);
        this.dialog.endFill();
        this.dialog.pivot.x = this.dialog.width/2;
        this.container.orgY = window.innerHeight - 740+30;
        this.container.y = this.container.orgY;
        this.container.addChild(this.dialog);
        this.container.visible = false;
        this.container.interactive = true;

        // ===== title =====
        const noteTitle = this.container.addChild(new PIXI.Text('NOTE', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 50, fontWeight: 400, fill:dataProvider.data.colorDark})));
        Utils.pivotCenter(noteTitle);
        noteTitle.y = 70;

        // Buffer
        const bufferContainer = this.container.addChild(new PIXI.Container());
        bufferContainer.y = 145;
        for(let i=0; i<4; i++){
            this['buffer'+i] = bufferContainer.addChild(new NoteBuffer());
            this['buffer'+i].x = 200*i;
        }
        bufferContainer.pivot.x = bufferContainer.width/2;
        
        const numContainer = this.container.addChild(new PIXI.Container());
        for(let i=0; i<10; i++){
            this['num'+i] = numContainer.addChild(new NoteNumber(i==9?0:i+1));
            this['num'+i].x = 155*(i>4 ? i-5 : i);
            this['num'+i].y = i > 4 ? 140 : 0;
        }
        numContainer.y = 420;
        numContainer.pivot.x = numContainer.width/2;

    }

    reset(){
        for(let i=0; i<4; i++){
            this['buffer'+i].reset();
        }
        
        for(let i=0; i<10; i++){
            this['num'+i].reset();
        }
    }

    show(){
        gsap.timeline()
            .set(this.bg, {alpha:0})
            .to(this.bg, {alpha:0.7, duration:0.2, ease:'none'})
        this.bg.visible = true;
        this.bg.interactive = true;
        this.container.visible = true;
        gsap.timeline()
            .set(this.container, {y:this.container.orgY + this.container.height})
            .to(this.container, {y:this.container.orgY + (dataProvider.data.standalone ? dataProvider.data.standaloneFooterOffset : 0), duration:0.3, ease:'back.out(1)'})
            
    }

    hide(){
        gsap.to(this.bg, {alpha:0, duration:0.2, ease:'none'});
        gsap.timeline()
            .to(this.container, {y:this.container.orgY + this.container.height, duration:0.3, ease:'power1.in'})
            .call(()=>{
                this.bg.visible = false;
                this.container.visible = false;
                this.parent.noteBtn.interactive = true;
            });
    }

    /* ------------------------------------------------------------
        削除準備〜削除まで
    ------------------------------------------------------------ */
    readyToDie(){
    }
}