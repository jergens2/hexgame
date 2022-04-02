import { GamePlayer } from "./game-player.class";

export class GameConfiguration{

    private _players: GamePlayer[] = [];
    private _currentPlayer: GamePlayer;

    public get playerCount(): number { return this._players.length; }
    public get players(): GamePlayer[] { return this._players;}

    public get currentPlayer(): GamePlayer { return this._currentPlayer; }


    constructor(playerCount?: number){
        if(playerCount){
            this._buildPlayers(playerCount);
        }else{
            this._buildPlayers(2);
        }
        this._currentPlayer = this._players[0];
    }

    public incrementTurn(){
        let newIndex = this._players.indexOf(this._currentPlayer) + 1;
        if(newIndex >= this.playerCount){
            newIndex = 0;
        }
        this._currentPlayer = this._players[newIndex];
    }

    private _buildPlayers(playerCount: number){
        for(let i=1; i<=playerCount; i++){
            const name = "Player "+ i;    
            
            const color: string = this._randomColor();
            const newPlayer = new GamePlayer(color, name);
            this._players.push(newPlayer);
        }
    }

    private _randomColor(): string{
        const r = Math.floor(Math.random() * 255) - 50;
        const g = Math.floor(Math.random() * 255) - 50;
        const b = Math.floor(Math.random() * 255) - 50;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}