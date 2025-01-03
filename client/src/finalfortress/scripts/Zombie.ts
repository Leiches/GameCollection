export class Zombie {
    constructor(
        public width: number,
        public height: number,
        public positionX: number,
        public positionY: number,
        public color: string
    ) {}

    move(newX: number, newY: number) {
        this.positionX += newX;
        this.positionY += newY;
    }
}
