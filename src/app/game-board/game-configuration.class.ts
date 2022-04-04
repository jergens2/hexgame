import { GamePlayer } from "./game-player.class";

export class GameConfiguration {

    private _players: GamePlayer[] = [];
    private _currentPlayer: GamePlayer;

    public get playerCount(): number { return this._players.length; }
    public get players(): GamePlayer[] { return this._players; }

    public get currentPlayer(): GamePlayer { return this._currentPlayer; }




    constructor(playerCount?: number) {
        if (playerCount) {
            this._buildPlayers(playerCount);
        } else {
            this._buildPlayers(2);
        }
        this._currentPlayer = this._players[0];
    }

    public incrementTurn() {
        let newIndex = this._players.indexOf(this._currentPlayer) + 1;
        if (newIndex >= this.playerCount) {
            newIndex = 0;
        }
        this._currentPlayer = this._players[newIndex];
    }

    private _buildPlayers(playerCount: number) {
        if (playerCount === 2) {
            const randomIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            let secondIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            while(secondIndex === randomIndex){
                secondIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            }

            console.log(randomIndex, secondIndex, this._sampleStartingColors.length)
            const color1: string = this._sampleStartingColors[randomIndex];
            const color2: string = this._sampleStartingColors[secondIndex];
            console.log(color1, color2);
            this._players.push(new GamePlayer(color1, 'Player 1'));
            this._players.push(new GamePlayer(color2, 'Player 2'));
        } else {
            for (let i = 1; i <= playerCount; i++) {
                const name = "Player " + i;

                const color: string = this._generateRandomColor();
                const newPlayer = new GamePlayer(color, name);
                this._players.push(newPlayer);
            }
        }

    }

    private _generateRandomColor(): string {
        const lightness: number = 25; 
        const max = 245;  // closer to 255 make it lighter;
        const min: number = max - lightness;
        const r = Math.floor(Math.random() * (max - min + 1) + min);
        const g = Math.floor(Math.random() * (max - min + 1) + min);
        const b = Math.floor(Math.random() * (max - min + 1) + min);
        console.log('rgb(' + r + ', ' + g + ', ' + b + ')')
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

        /**
    rgb(204, 255, 204) = 663 / 768 = .86
    rgb(255, 255, 204) = 714 / 768 = .93
    rgb(255, 204, 204) = 663 / 768 = .86
    rgb(255, 204, 255) = 714 / 768 = .93
    rgb(204, 204, 255) = 663 / 768 = .86
    rgb(204, 255, 255) = 714 / 768 = .93
     */
    private _sampleStartingColors: string[] = [
        'rgb(204, 255, 204)',
        'rgb(255, 255, 204)',
        'rgb(255, 204, 204)',
        'rgb(255, 204, 255)',
        'rgb(204, 204, 255)',
        'rgb(204, 255, 255)',
    ];



}