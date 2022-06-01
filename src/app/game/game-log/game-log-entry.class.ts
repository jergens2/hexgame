import { GameState } from "../game-state.class";
import { GamePlayer } from "../game-player/game-player.class";

export class GameLogEntry{
    
    private _turnCount: number;
    private _message: string;
    private _currentPlayer: GamePlayer;

    public get message(): string { return this._message; }
    public get turnCount(): number { return this._turnCount; }
    public get currentPlayer(): GamePlayer { return this._currentPlayer; }

    public toString(): string {
        return "Turn " + this.turnCount + "\t" + this.currentPlayer.name + "\t" + this.message; 
    }
    
    constructor(message: string, config :GameState){
        this._message = message;
        this._turnCount = config.currentTurn;
        this._currentPlayer = config.currentPlayer;
    }
}