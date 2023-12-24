import { dataProvider } from "../dataProvider.js";

class Utils {
    static hello(){
        console.log('hello');
    }

    /* ------------------------------------------------------------
        TextStyle複製
    ------------------------------------------------------------ */
    static cloneTextStyle(originalStyle, opt) {
        const cloned = new PIXI.TextStyle(JSON.parse(JSON.stringify(originalStyle)));
        if(opt){
            for (const key in opt) {
                cloned[key] = opt[key];
            }
        }
        return cloned;
    }

    /* ------------------------------------------------------------
        デザインガイドをロードする
    ------------------------------------------------------------ */
    static loadDesignGuide(path, alignBy){
        const texture = PIXI.Texture.from(path);
        const sprite = new PIXI.Sprite(texture);
        texture.baseTexture.addListener("loaded", (event) => {
            let destSize = this.fitWidth(sprite.width, sprite.height, dataProvider.app.renderer.width);
            sprite.width = destSize[0];
            sprite.height = destSize[1];
            this.alignBottomWindow(sprite);
        })
        // sprite.anchor.set(0.5);
        return sprite;
    }

    /* ------------------------------------------------------------
        AlignHelperから一旦統合する
    ------------------------------------------------------------ */
    static alignTopWindow(target){
        target.x = Math.round(window.innerWidth/2 - target.width/2);
        target.y = 0;
    }
    
    static alignBottomWindow(target){
        target.x = Math.round(window.innerWidth/2 - target.width/2);
        target.y = window.innerHeight - target.height;
    }




    /*
        余白あってもいいからいい感じに収めるのと、
        余白無くしてクロップしてマスクするから、と両方の用途ありそうなのでもう少し考える
    */
    // static fitInside(w, h, max, byScale, by){
    //     var current = [];
    //     let _by = by ? by : 'auto';
    //     switch(_by) {
    //         case 'auto':
    //             current = this.fitWidth(w, h, max, byScale);
    //             if(current[1] > max) {
    //                 current = this.fitHeight(w, h, max, byScale);
    //             }
    //             break;
    //         case 'width':
    //             current = this.fitWidth(w, h, max, byScale);
    //             break;
    //         case 'height':
    //             current = this.fitHeight(w, h, max, byScale);
    //             break;
    //         default:
    //             break;
    //     }
    //     return current;
    // }

    static fitWidth(w, h, max, byScale){
        const maxW = max;
        const maxH = max;
        const tmpWidth = maxW;
        const resizeRate = maxW / w;
        const tmpHeight = Math.round(h * resizeRate);
                                
        const tmpScaleX = tmpWidth / maxW;
        const tmpScaleY = tmpHeight / maxH;
        if(byScale) {
            return [tmpScaleX, tmpScaleY];
        }else {
            return [tmpWidth, tmpHeight];
        }
    }

    static fitHeight(w, h, max, byScale){
        const maxH = max;
        const maxW = max;
                                
        const tmpHeight = maxH;
        const resizeRate = maxH / h;
        const tmpWidth = Math.round(w * resizeRate);		
        const tmpScaleX = tmpWidth / maxW;
        const tmpScaleY = tmpHeight / maxH;
        if(byScale) {
            return [tmpScaleX, tmpScaleY];
        }else {
            return [tmpWidth, tmpHeight];
        }
    }

    /* ------------------------------------------------------------
        Grid引く
    ------------------------------------------------------------ */
    static drawGrid(){
        let gridContainer = new PIXI.Sprite();
        this._gridLine(gridContainer, 'v', 0, 0, 4);
        this._gridLine(gridContainer, 'v', 200);
        this._gridLine(gridContainer, 'v', 400);
        this._gridLine(gridContainer, 'v', 600);
        this._gridLine(gridContainer, 'v', 800);
        this._gridLine(gridContainer, 'v', -200);
        this._gridLine(gridContainer, 'v', -400);
        this._gridLine(gridContainer, 'v', -600);
        this._gridLine(gridContainer, 'v', -800);

        this._gridLine(gridContainer, 'h', 0, 0, 4);
        this._gridLine(gridContainer, 'h', 200);
        this._gridLine(gridContainer, 'h', 400);
        this._gridLine(gridContainer, 'h', -200);
        this._gridLine(gridContainer, 'h', -400);

        return gridContainer;
    }

    static _gridLine(container, vh, offsetPos, color, lineWidth, lineLength){
        let offsetLen = 0;
        let line = new PIXI.Graphics();
        line.lineStyle(
            lineWidth ? lineWidth : 2, 
            color ? color : 'red'
        );
        let val = lineLength ? lineLength : (vh == 'v' ? window.innerWidth : window.innerHeight);
        let v = vh == 'v' ? val-offsetLen : 0;
        let h = vh == 'h' ? val-offsetLen : 0;
        line.moveTo(0-v/2, 0-h/2);
        line.lineTo(v/2, h/2);
        if(offsetPos){
            switch(vh){
                case 'v':
                    line.y += offsetPos;
                    break;
                case 'h':
                    line.x += offsetPos;
                    break;
                default:
            }
        }
        container.addChild(line);
        return line;
    }

    /* ------------------------------------------------------------
        pivot
    ------------------------------------------------------------ */
    static pivotCenter(target){
        target.pivot.set(target.width/2, target.height/2);
    }
    static pivotX(target){
        target.pivot.x = target.width / 2;
    }
    static pivotY(target){
        target.pivot.y = target.height / 2;
    }


    
}

export default Utils;