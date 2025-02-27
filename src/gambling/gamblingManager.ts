import { randomBytes } from 'crypto';

const TIME_BETWEEN_SIGMA = 1000 * 15;

class GamblingManager {
    private timer: NodeJS.Timeout | undefined;
    private nextSpin: number = 0;
    private previousSpinResult = 0;

    private start() {
        this.nextSpin = Date.now() + TIME_BETWEEN_SIGMA;
        this.timer = setInterval(() => {
            if(Date.now() > this.nextSpin) {
                clearInterval(this.timer);
                this.previousSpinResult = this.getSecureRandomInt(1, 34);
                this.start();
            }
        });
    }

    private getSecureRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        const range = max - min + 1;
    
        const randomBuffer = randomBytes(4);
        const randomValue = randomBuffer.readUInt32LE(0);
    
        return min + (randomValue % range);
    } 
}