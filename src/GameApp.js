
import { StartScreen } from './scenes/StartScene.js';
import { GameScene } from './scenes/GameScene.js';
import { EndScreenContainer } from './scenes/EndScene.js';
import { GameState } from './game/GameState.js';
import { design } from './constants/design.js';
import Utils from './utils/helper/Utils.js';
import AlignHelper from './utils/helper/AlignHelper.js';

export class GameApp {
    constructor() {
        this.app = new PIXI.Application({
            background: design.colors.DARK,
            resizeTo: window
        });
        this.app.view.id = 'pixi';
        document.body.appendChild(this.app.view);

        this.gameState = new GameState();
        this.currentScene = null;

        this.setupResizeHandler();

        // モバイルデバイスでない、かつGitHub Pagesでの閲覧の場合、PC用ビューを表示
        if (!Utils.isMobileDevice() && Utils.isOnGithub()) {
            // TODO: PCViewのロジックを移植
        } else {
            this.changeScene(new StartScreen());
        }
    }

    changeScene(newScene) {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            if (this.currentScene.destroy) {
                this.currentScene.destroy({ children: true });
            }
        }
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);

        // シーン遷移のイベントハンドリング
        this.currentScene.on('start-game', () => {
            this.gameState.reset();
            this.changeScene(new GameScene(this.gameState));
        });

        this.currentScene.on('game-over', () => {
            this.changeScene(new EndScene(false, this.gameState.secret));
        });

        this.currentScene.on('win', () => {
            this.changeScene(new EndScreenContainer(false, this.gameState));
        });

        this.currentScene.on('restart-game', () => {
            this.changeScene(new StartScreen());
        });
    }

    setupResizeHandler() {
        // TODO: LandscapeViewのロジックを移植
        window.addEventListener('resize', () => {
            // リサイズ処理
        });
    }
}
