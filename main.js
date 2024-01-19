import { ApplicationRoot } from './ApplicationRoot.js';
import { PCView } from './PCView.js';
import { LandscapeView } from './LandscapeView.js';
import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';

let app;
// let timeoutID = 0;
let landscapeView;

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

    app = new PIXI.Application({
        background: '#1A1F22',
        resizeTo: window
    });
    document.body.appendChild(app.view);
    dataProvider.app = app;

    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        startApp();
    }else{
        const pcView = app.stage.addChild(new PCView());
        pcView.pivot.set(110, 140);
        pcView.x = window.innerWidth / 2;
        pcView.y = window.innerHeight / 2;
    }
}

function startApp(){
    dataProvider.wWidth = window.innerWidth;
    dataProvider.wHeight = window.innerHeight;
    AlignHelper.lockedScreenWidth = dataProvider.wWidth;
    AlignHelper.lockedScreenHeight = dataProvider.wHeight;
    app.stage.addChild(new ApplicationRoot());

    landscapeView = new LandscapeView();
    app.stage.addChild(landscapeView);
}

function isPortraitOrientation(){
    return window.innerWidth < window.innerHeight;
}

screen.orientation.addEventListener("change", (event) => {
    let timeoutID = 0;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
        landscapeView.visible = !isPortraitOrientation();
        app.resize();
        landscapeView.fit();
    }, 500);
  });