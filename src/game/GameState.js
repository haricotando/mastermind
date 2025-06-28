
export class GameState {
    constructor() {
        this.secret = this.generateSecret();
        this.currentAttempt = 0;
        this.attemptMax = 10;
        this.history = []; // { guess: string, hit: number, blow: number }
    }

    /**
     * 4桁の重複しないランダムな数字を生成する
     * @returns {string}
     */
    generateSecret() {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let secret = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            secret += digits.splice(randomIndex, 1)[0];
        }
        return secret;
    }

    /**
     * ユーザーの推測を記録し、結果を返す
     * @param {string} guess - ユーザーの4桁の推測
     * @returns {{hit: number, blow: number, isWin: boolean, isGameOver: boolean}}
     */
    submitGuess(guess) {
        if (guess.length !== 4) {
            throw new Error('Guess must be 4 digits.');
        }

        const { hit, blow } = this.checkGuess(guess);
        this.currentAttempt++;
        this.history.push({ guess, hit, blow });

        const isWin = hit === 4;
        const isGameOver = this.currentAttempt >= this.attemptMax && !isWin;

        return { hit, blow, isWin, isGameOver };
    }

    /**
     * 推測と秘密の数字を比較し、HitとBlowを計算する
     * @param {string} guess
     * @returns {{hit: number, blow: number}}
     */
    checkGuess(guess) {
        let hit = 0;
        let blow = 0;
        const secretDigits = this.secret.split('');
        const guessDigits = guess.split('');

        // Hitのカウント
        guessDigits.forEach((digit, i) => {
            if (digit === secretDigits[i]) {
                hit++;
            }
        });

        // Blowのカウント
        guessDigits.forEach((digit, i) => {
            if (secretDigits.includes(digit) && digit !== secretDigits[i]) {
                blow++;
            }
        });
        
        return { hit, blow };
    }

    /**
     * ゲームをリセットする
     */
    reset() {
        this.secret = this.generateSecret();
        this.currentAttempt = 0;
        this.history = [];
    }

    get remainingAttempts() {
        return this.attemptMax - this.currentAttempt;
    }
}
