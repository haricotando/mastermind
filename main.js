import { ApplicationRoot } from './ApplicationRoot.js';
import { PCView } from './PCView.js';
import { dataProvider } from './dataProvider.js';

WebFont.load({
    google: {
      families: ['Inter:100,200,300,400,700', 'Material+Icons'],
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
        resizeTo: window
    });
    document.body.appendChild(app.view);
    dataProvider.app = app;

    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        app.stage.addChild(new ApplicationRoot());
    }else{
        const pcView = app.stage.addChild(new PCView());
        pcView.pivot.set(110, 140);
        pcView.x = window.innerWidth / 2;
        pcView.y = window.innerHeight / 2;
    }
}

