import { StartScreen } from './StartScreen.js';
import { dataProvider } from './dataProvider.js';
import { HeaderContainer } from './headerContainer.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';



export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();

        const grid = this.addChild(GraphicsHelper.drawGrid());
        grid.alpha = 0.3;
        this.initStartScreen();
        // this.headerContainer = new HeaderContainer();
        // this.addChild(this.headerContainer);
    }

    /* ------------------------------------------------------------
        イントロ
    ------------------------------------------------------------ */
    initStartScreen(){
        // introスキップフラグ時はaddしない
        if(dataProvider.data.skipIntro){
            return false;
        }

        let startScreen = new StartScreen();
        this.addChild(startScreen);
        AlignHelper.centerWindow(startScreen);

        // const filter = new PIXI.ColorMatrixFilter()
        // filter.colorTone(5,1, 0xFFFFFF, 0xFF0000, true);
        // noiseFilter.noise = 0.7
        // noiseFilter.seed = 0.8
        // startScreen.filters = [filter];

    }

    init
}