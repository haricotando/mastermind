import { Attempt } from './Attempt.js';
import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class AttemptContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.attemptCount = 0;
        this.attempts = [];
        this.init();

    }

    init(){
        let valueIndex = 0;
        let posX = [-230, 230];
        let posYCount = 0;
        let posYStart = 350;
        const posYMargin = 128;

        for(let i=0; i<10; i++){
            this['attempt' + i] = this.addChild(new Attempt(i));
            this['attempt' + i].x = i % 2 === 0 ? posX[0] : posX[1];
            this['attempt' + i].y = posYCount * posYMargin + posYStart;
            this['attempt' + i].attemptNumber = i+1;
            posYCount += i % 2 === 0 ? 0 : 1;
        }

        // gsap.set(this, {alpha:0});
        // gsap.to(this, {alpha:1, duration:0.3, ease:'none', delay:0.5})
    }

    /* ------------------------------------------------------------
        Attempt
    ------------------------------------------------------------ */
        addAttempt(guess, result, flag){
        let attempt = this['attempt' + this.attemptCount];
        attempt.add(guess, result, flag)
        this.attemptCount++;

        // flag 0 = default
        // flag 1 = no match
        // flag 2 = match!

        if(flag==2){
            return false;
        }
        // this.titleM = this.introContainer.addChild(new PIXI.Text(guess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 110})));
        // attempt.
        // let attemptText = new PIXI.Text(guess, guessStyle);
        // attemptText.anchor.set(0.5);
        // guessContainer.addChild(attemptText);

        // gsap.to(guessContainer, {y: dataProvider.data.currentAttempt * 100, duration: 0.3, ease: 'elastic.out(1,1)'});
        // gsap.timeline().to(guessStyle, {letterSpacing:-5, duration:0.2})
        //     .call(() => {
        //         guessStyle.letterSpacing = 0;
        //         attemptText.text = guess + '->' + result;
        //         guessContainer.scale.x = 1.5;
        //         guessContainer.scale.y = 1;
        //     })
        //     .to(guessContainer.scale, {x:1, y:1, duration:flag==0 ? 0.4 : 1.5, ease:'expo'})

        // switch (flag) {
        //     case 0:
        //         gsap.timeline()
        //         .to(guessStyle, {duration:0.1, fill:'yellow', ease:'steps(1)'}, '+=0.2')
        //         .to(guessStyle, {duration:0.1, fill:'purple', ease:'steps(1)'})
        //         .to(guessStyle, {duration:0.1, fill:'black'});
        //         break;
        //     case 1:
        //         gsap.timeline()
        //         .to(guessStyle, {duration:0.1, fill:'yellow', ease:'steps(1)'}, '+=0.2')
        //         .to(guessStyle, {duration:0.1, fill:'purple', ease:'steps(1)'})
        //         .to(guessStyle, {duration:0.1, fill:'magenta', ease:'steps(1)'})
        //         .to(guessStyle, {duration:0.1, fill:'cyan', ease:'steps(1)'})
        //         .to(guessStyle, {duration:0.3, fill:'black'});
        //         break;
        //     case 2:
        //         let circle = GraphicsHelper.exDrawCircle(0, 0, 1000, 0x000000);
        //         AlignHelper.centerWindow(circle);
        //         circle.scale.set(0.1);
        //         circle.alpha = 0;
        //         this.addChild(circle);
        //     default:
        //         console.log("ER");
        // }

    }

    suicide(){
        this.parent.removeChild(this);
    }
}