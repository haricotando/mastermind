import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class PCView extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, 220, 220, false, true));

        let bLoaded = false;

        const qr = qrcode(0, 'M');
        qr.addData(window.location.href);
        qr.make();
        const qrDataURL = qr.createDataURL(20, 0);
        const texture = PIXI.Texture.from(qrDataURL);
        const qrContainer = new PIXI.Sprite(texture);
        
        
        
        const onLoaded = (e) => {
            if(bLoaded){
                return false;
            }
            bLoaded = true;

            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            const qrSprite = new PIXI.Sprite(texture);
            this.addChild(qrSprite);
            qrSprite.width = 200;
            qrSprite.height = 200;
            qrSprite.position.set(10, 10);
        }
        
        texture.baseTexture.once('loaded', () => {
            onLoaded();
        });

        if(texture.width){
            onLoaded();
        }
    }
}