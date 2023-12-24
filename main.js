import { ApplicationRoot } from './ApplicationRoot.js';
import { dataProvider } from './dataProvider.js';

WebFont.load({
    google: {
      families: ['Inter:100,300,200,400,700,900', 'Material+Icons'],
    },
    
    active: () => {
        init();
        console.log('OK: Font');
    },
    inactive: () => {
        console.log("ER: Font");
    },
  });

function init(){
    gsap.registerPlugin(PixiPlugin);
    let app = new PIXI.Application({
        background: '#1A1F22',
        // background: '#FF0000',
        resizeTo: window
    });
    document.body.appendChild(app.view);
    dataProvider.app = app;
    const applicationRoot = new ApplicationRoot();
    app.stage.addChild(applicationRoot);
    //
}

