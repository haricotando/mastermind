import { dataProvider } from "../dataProvider.js";

class Utils {
    static hello(){
        console.log('hello');
    }

    static _appRoot = 0;
    static _traceText;
    static initTrace(appRoot){
        this._appRoot = appRoot;
        this._appRoot.sortableChildren = true;
        this._traceText = this._appRoot.addChild(new PIXI.Text('', {fontSize:50, fill:0xFFFFFF}));
        this._traceText.anchor.set(0.5);
        this._traceText.x = window.innerWidth/2;
        this._traceText.y = window.innerHeight/2;
    }

    static put(val){
        this._traceText.zIndex =1000;
        this._traceText.text = val;
        this._appRoot.sortChildren();
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
            // dataProvider.app 依存は良くない
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

    static isMobileDevice(){
        return navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    }
    
    static isOnGithub() {
        const hostname = window.location.hostname;
        return hostname.endsWith('.github.io');
    }
}

export default Utils;