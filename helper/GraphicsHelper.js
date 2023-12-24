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
            let lineColor = line.color ? line.color : undefined;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }

        if(fill){
            let fillColor = fill.color ? fill.color : 1;
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

    /* ------------------------------------------------------------
        init
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

        gridContainer.x = window.innerWidth / 2;
        gridContainer.y = window.innerHeight / 2;
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
}

export default GraphicsHelper;



