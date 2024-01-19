import { dataProvider } from './dataProvider.js';


export class QRContainer extends PIXI.Container {
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();

        // Background
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(dataProvider.data.colorDark);
        this.bg.drawRect(0, 0, dataProvider.wWidth, dataProvider.wHeight);
        this.bg.endFill();
        this.bg.alpha = 0;
        this.addChild(this.bg);
        this.bg.interactive = true;
        gsap.to(this.bg, {alpha:0.7, duration:0.3});

        // Dialog
        this.dialog = new PIXI.Graphics();
        this.dialog.beginFill(0xFFFFFF);
        this.dialog.drawRoundedRect(0, 0, 800, 800, 40);
        this.dialog.endFill();
        this.dialog.pivot.set(400,400);
        this.dialog.x = dataProvider.wWidth / 2;
        this.dialog.y = dataProvider.wHeight / 2;
        this.addChild(this.dialog);
        this.dialog.scale.x = 1.5;
        this.dialog.scale.y = 1.5;
        this.dialog.alpha = 0;
        gsap.timeline().to(this.dialog.scale, {x:1, y:1, duration:0.3, ease:'expo'})
        gsap.timeline().to(this.dialog, {alpha:1, duration:0.3, ease:'expo'})

        //
        this.bg.on('touchstart', (event) => {
            this.readyToDie();
        });

        // QR
        const qr = qrcode(0, 'M');
        qr.addData(window.location.href);
        qr.make();
        const qrDataURL = qr.createDataURL(10, 0);
        const texture = PIXI.Texture.from(qrDataURL);
        const qrContainer = new PIXI.Sprite(texture);

        this.qrContainer = new PIXI.Sprite(texture);
        this.qrContainer.width = 600;
        this.qrContainer.height = 600;
        this.qrContainer.x = 100;
        this.qrContainer.y = 100;
        this.dialog.addChild(this.qrContainer);

    }

    /* ------------------------------------------------------------
        削除準備〜削除まで
    ------------------------------------------------------------ */
    readyToDie(){
        gsap.to(this.bg, {alpha:0, duration:0.3});
        gsap.timeline().to(this.dialog.scale, {x:0.9, y:0.9, duration:0.3, ease:'expo'})
        gsap.timeline().to(this.dialog, {alpha:0, duration:0.3, ease:'expo'})
        .call(()=>{
            this.parent.qrBtn.interactive = true;
            this.parent.removeChild(this);
        })
    }
}