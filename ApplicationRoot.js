import { StartScreen } from './StartScreen.js';
import { dataProvider } from './dataProvider.js';
import { HeaderContainer } from './HeaderContainer.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';
import { InputContainer } from './InputContainer.js';



export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();

        const grid = this.addChild(GraphicsHelper.drawGrid());
        grid.alpha = 0;

        const guide = this.addChild(Utils.loadDesignGuide('./guides/guide_input.png', 'bottom'));
        guide.alpha = 0;

        dataProvider.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 100, fontWeight: 100, fill: dataProvider.data.colorLight,
        });

        if(dataProvider.data.skipIntro){
            this.initHeader();
            this.initInput();
        }else{
            this.initStartScreen();
            
        }
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

    initHeader(){
        this.headerContainer = this.addChild(new HeaderContainer());
        AlignHelper.topWindow(this.headerContainer);
    }
    
    initInput(){
        this.inputContainer = this.addChild(new InputContainer());
        this.inputContainer.x = window.innerWidth/2;
    }
}