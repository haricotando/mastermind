class AlignHelper {
    
    /*

    AlignHelper.center(parent, this);
    作りながら最適化していく

    log 
    2023/12/19 pivot関連

    */

    static hello(){
        console.log('hello');
    }

    /* ------------------------------------------------------------
        windowベースのセンタリングの類
    ------------------------------------------------------------ */
    // ど真ん中
    static centerWindow(target){
        this.horizontalCenterWindow(target);
        this.verticalCenterWindow(target);
    }
    // 横で真ん中
    static horizontalCenterWindow(target){
        if(this.lockedScreenWidth){
            target.x = this.lockedScreenWidth / 2;
        }else{
            target.x = window.innerWidth / 2;
        }
    }
    // horizontal, vertical どっちがxでyか忘れる気がするのでショートカット
    static xCenterWindow(target){
        this.horizontalCenterWindow(target);
    }
    
    // 縦で真ん中
    static verticalCenterWindow(target){
        if(this.lockedScreenHeight){
            target.y = this.lockedScreenHeight / 2;
        }else{
            target.y = dataProvider.wHeight / 2;
        }
    }
    // horizontal, vertical どっちがxでyか忘れる気がするのでショートカット
    static yCenterWindow(target){
        this.verticalCenterWindow(target);
    }

    static centerPivot(target){
        target.pivot.set(target.width/2, target.height/2);
    }
    /* ------------------------------------------------------------
        windowベースのどこか揃え
    ------------------------------------------------------------ */
    static bottomWindow(target){
        if(this.lockedScreenHeight){
            target.y = this.lockedScreenHeight;
        }else{
            target.y = dataProvider.wHeight;
        }
    }

    static topWindow(target){
        target.y = 0;
        this.horizontalCenterWindow(target);
    }
 
}

AlignHelper.lockedScreenWidth = false;
AlignHelper.lockedScreenHeight = false;

export default AlignHelper;