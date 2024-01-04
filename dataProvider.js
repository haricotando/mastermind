export const dataProvider = {
    app: undefined,
    data: {
        standalone: undefined,
        answerLock: false,
        skipIntro: false,
        
        secret: '',
        lastGuess: '',
        currentAttempt: 0,
        attemptMax: 10,
        hardMode: 0,
        
        offsetY: -20,
        headerOffset: 285,
        standaloneFooterOffset: -100,

        // Color 系は別objにまとめたい
        colorDark: 0x1A1F22,
        colorLight: 0xDCD3CC,

        colorEmph1: 0x00FFFF,
        colorEmph2: 0xFFFF00,
        colorEmph3: 0xFF00FF,
    },
    baseStyle: {},
    colorMatrixFilterEmph:[],
    colorMatrixFilterBase:[],
    
};

/*

dataProvider.data.VARIABLE

*/