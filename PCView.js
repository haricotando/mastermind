import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class PCView extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, 220, 220, false, true));


        const qr = qrcode(0, 'M');
        qr.addData(window.location.href);
        qr.make();
        const qrDataURL = qr.createDataURL(10, 0);
        const texture = PIXI.Texture.from(qrDataURL);
        const qrContainer = new PIXI.Sprite(texture);

        this.qrContainer = new PIXI.Sprite(texture);
        this.qrContainer.width = 200;
        this.qrContainer.height = 200;
        this.qrContainer.x = 10;
        this.qrContainer.y = 10;
        this.addChild(this.qrContainer);

        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 80,
            fill: dataProvider.data.colorEmph2,
            });

        this.label = new PIXI.Text('\ue325', style);
        this.addChild(this.label);
        this.label.anchor.set(0.5);
        this.label.x = 110;
        this.label.y = 280;
    }
}