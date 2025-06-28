
import { GameApp } from './GameApp.js';

WebFont.load({
    google: {
      families: ['Inter:100,200,300,400,700', 'Material+Icons'],
    },
    active: () => {
        gsap.registerPlugin(PixiPlugin);
        new GameApp();
        console.log('OK: Font');
    },
    inactive: () => {
        console.log("ER: Font");
    },
  });
