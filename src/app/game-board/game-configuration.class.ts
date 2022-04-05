import { GamePlayer } from "./game-player.class";

export class GameConfiguration {

    private _players: GamePlayer[] = [];
    private _currentPlayer: GamePlayer;
    private _currentTurn: number = 1;

    private _canvasWidth: number;
    private _canvasHeight: number;
    private _tileRadius: number;
    private _tileBuffer: number;
    private _tileDisabledRate: number;
    private _tilePoweredCount: number;

    public get playerCount(): number { return this._players.length; }
    public get players(): GamePlayer[] { return this._players; }
    public get currentPlayer(): GamePlayer { return this._currentPlayer; }
    public get currentTurn(): number { return this._currentTurn; }
    public get canvasWidth(): number { return this._canvasWidth; }
    public get canvasHeight(): number { return this._canvasHeight; }
    public get tileRadius(): number { return this._tileRadius; }
    public get tileBuffer(): number { return this._tileBuffer; }
    public get tileDisabledRate(): number { return this._tileDisabledRate; }
    public get tilePoweredCount(): number { return this._tilePoweredCount; }

    constructor(playerCount: number, canvasWidth: number, canvasHeight: number, tileRadius: number, tileBuffer: number, tileDisabledRate: number, tilePoweredCount: number) {
        this._buildPlayers(playerCount);
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._tileRadius = tileRadius;
        this._tileBuffer = tileBuffer;
        this._tileDisabledRate = tileDisabledRate; 
        this._tilePoweredCount = tilePoweredCount;
        this._currentPlayer = this._players[0];
    }

    public incrementTurn() {
        let newIndex = this._players.indexOf(this._currentPlayer) + 1;
        if (newIndex >= this.playerCount) {
            newIndex = 0;
        }
        this._currentPlayer = this._players[newIndex];
        this._currentTurn++;
    }

    private _buildPlayers(playerCount: number) {
        if (playerCount === 2) {
            const randomIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            let secondIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            while (secondIndex === randomIndex) {
                secondIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            }
            const color1: string = this._sampleStartingColors[randomIndex];
            const color2: string = this._sampleStartingColors[secondIndex];
            this._players.push(new GamePlayer(color1, 'Player 1'));
            this._players.push(new GamePlayer(color2, 'Player 2'));
        } else {
            if (playerCount <= this._sampleStartingColors.length) {
                const randomIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
                let currentIndex = randomIndex;
                for (let i = 1; i <= playerCount; i++) {
                    const name = "Player " + i;
                    const color: string = this._sampleStartingColors[currentIndex];
                    const newPlayer = new GamePlayer(color, name);
                    this._players.push(newPlayer);
                    currentIndex++;
                    if (currentIndex === this._sampleStartingColors.length) {
                        currentIndex = 0;
                    }
                }
            } else {
                console.log("Error:  too many players")
            }
        }
    }


    private _sampleStartingColors: string[] = [
        'rgb(204, 255, 204)',
        'rgb(255, 255, 204)',
        'rgb(255, 204, 204)',
        'rgb(255, 204, 255)',
        'rgb(204, 204, 255)',
        'rgb(204, 255, 255)',
    ];



}