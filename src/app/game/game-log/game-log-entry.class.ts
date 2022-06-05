import { GameState } from "../game-state.class";
import { Player } from "../player/player.class";

export class GameLogEntry{
    
    private _turnCount: number;
    private _message: string;
    private _currentPlayer: Player;

    public get message(): string { return this._message; }
    public get turnCount(): number { return this._turnCount; }
    public get currentPlayer(): Player { return this._currentPlayer; }

    public toString(): string {
        return "Turn " + this.turnCount + "\t" + this.currentPlayer.name + "\t" + this.message; 
    }
    
    constructor(message: string, config :GameState){
        this._message = message;
        this._turnCount = config.currentTurn;
        this._currentPlayer = config.currentPlayer;
    }
}