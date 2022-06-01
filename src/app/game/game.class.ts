import { Observable } from "rxjs";
import { GameBoard } from "./game-board/game-board.class";
import { Tile } from "./game-board/tiles/tile.class";
import { GameState } from "./game-state.class";
import { GamePlayer } from "./game-player/game-player.class";

export class Game {

    // public gameBoard: GameBoard;

    private _board: GameBoard;
    private _state: GameState;

    public get board(): GameBoard { return this._board; }
    public get configuration(): GameState { return this._state; }
    public get currentPlayer(): GamePlayer { return this._state.currentPlayer; }
    public get currentPlayer$(): Observable<GamePlayer> { return this._state.currentPlayer$; }
    public get players(): GamePlayer[] { return this._state.players; }
    public get playerCount(): number { return this._state.playerCount; }
    public get currentTurn$(): Observable<number> { return this._state.currentTurn$; }
    public get currentTurn(): number { return this._state.currentTurn; }
    public get tiles(): Tile[] { return this._board.tiles; }


    constructor(state: GameState) {
        this._state = state;
        this._board = new GameBoard(this._state);
    }

    public startGame() {
        this._state.currentPlayer$.subscribe(player => {
            if (player.isBot) {
                // this._takeBotTurn();
            }
        });
        this.currentTurn$.subscribe(turn => {
            // this._logService.addToLog("The turn was incremented! initiating GROWTH", this._configuration);
            // this.tiles.forEach(tile => tile.grow());
        });
    }

    // private _takeBotTurn() {
    //     if (this.currentPlayer.isBot) {
    //         const currentBotPlayer = this.currentPlayer as GamePlayerBot;
    //         const botTurnTimeMs = 100;
    //         timer(botTurnTimeMs).subscribe(() => {
    //             currentBotPlayer.takeBotTurn(this.tiles);
    //             // this._logService.addToLog("Incrementing player", this._configuration);
    //             this._configuration.incrementPlayer();
    //         });
    //     }
    // }


    public onClickPass() {
        // this._tiles.forEach(tile => tile.deselectTile());
        // // this._logService.addToLog("Player PASSED", this._configuration);
        // this._configuration.incrementPlayer();
    }

}