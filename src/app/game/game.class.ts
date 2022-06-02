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
        this._startGame();
    }

    private _startGame() {
        this._state.currentPlayer$.subscribe(player => {
            if (player.isBot) {
            }
        });
        this.currentTurn$.subscribe(turn => {

        });
    }

    public onClickPass() {

    }

}