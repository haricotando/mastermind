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
            this['attempt' + i].x = i < 5 ? posX[0] : posX[1];
            this['attempt' + i].y = posYCount * posYMargin + posYStart;
            this['attempt' + i].attemptNumber = i+1;
            posYCount ++;
            if(i==4){
                posYCount = 0;
            }
        }

        // for(let i=0; i<10; i++){
        //     this['attempt' + i] = this.addChild(new Attempt(i));
        //     this['attempt' + i].x = i % 2 === 0 ? posX[0] : posX[1];
        //     this['attempt' + i].y = posYCount * posYMargin + posYStart;
        //     this['attempt' + i].attemptNumber = i+1;
        //     posYCount += i % 2 === 0 ? 0 : 1;
        // }

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
    }

    suicide(){
        this.parent.removeChild(this);
    }
}