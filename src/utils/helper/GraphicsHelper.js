class GraphicsHelper {

    static hello(){
        console.log('hello');
    }

    /* ------------------------------------------------------------
        init
    ------------------------------------------------------------ */
    static exDrawRect(x, y, width, height, line, fill) {
        const graphics = new PIXI.Graphics();
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }

        if(fill){
            let fillColor = fill.color ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        graphics.drawRect(x, y, width, height);
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /* ------------------------------------------------------------
        init
    ------------------------------------------------------------ */
    static exDrawCircle(x, y, radius, line, fill){
        const graphics = new PIXI.Graphics();
        
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }
        
        if(fill){
            let fillColor = fill.color ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        
        graphics.drawCircle(x, y, radius);
        
        if(fill){
            graphics.endFill();
        }
        return graphics;
    };
    
    static drawDashedCircle(x, y, radius, dashes, gaps, color, lineWidth){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(lineWidth, color);
    
        for (let i = 0; i < 360; i += dashes + gaps) {
            const startAngle = PIXI.DEG_TO_RAD * i;
            const endAngle = PIXI.DEG_TO_RAD * (i + dashes);
            graphics.arc(x, y, radius, startAngle, endAngle);
        }
    
        graphics.closePath();
        graphics.endFill();
    return graphics;
    };
}

export default GraphicsHelper;



