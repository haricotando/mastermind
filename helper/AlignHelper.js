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
        target.x = window.innerWidth / 2;
    }
    // horizontal, vertical どっちがxでyか忘れる気がするのでショートカット
    static xCenterWindow(target){
        this.horizontalCenterWindow(target);
    }
    
    // 縦で真ん中
    static verticalCenterWindow(target){
        target.y = window.innerHeight / 2;
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
        target.y = window.innerHeight;
    }

    static topWindow(target){
        target.y = 0;
        this.horizontalCenterWindow(target);
    }
    // static horizontalCenter(parent, target){
    //     let parentWidth = parent == window ? window.innerWidth : parent.width;
    //     target.x = Math.round((parentWidth - target.width) / 2);
    // }
    
    // static verticalCenter(parent, target){
    //     target.y = Math.round((parent.height - target.height) / 2);
    // }
    
    // static verticalBottom(parent, target){
    //     let parentHeight = parent == window ? window.innerHeight : parent.height;
    //     target.y = Math.round(parentHeight - target.height);
    // }
    
    // static top(parent, target){
    //     this.horizontalCenter(parent, target);
    //     target.y = 0;
        
    // }

    // static center(parent, target){
    //     this.horizontalCenter(parent, target);
    //     this.verticalCenter(parent, target);
    // }

    // static bottom(parent, target){
    //     this.horizontalCenter(parent, target);
    //     this.verticalBottom(parent, target);
    // }

    // static lt(parent, target){
    // }

    // static rt(parent, target){
    // }

    // static left(parent, target){
    //     target.x = 0;
    // }

    // static right(parent, target){
    //     let parentWidth = parent == window ? window.innerWidth : parent.width;
    //     target.x = parentWidth;
    // }

    // static lb(parent, target){
    // }

    // static rb(parent, target){
    // }
}

export default AlignHelper;