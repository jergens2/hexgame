import { Observable } from "rxjs";
import { GameBoard } from "./game-board/game-board.class";
import { Tile } from "./game-board/tiles/tile.class";
import { GameState } from "./game-state.class";
import { Player } from "./player/player.class";
import { GameTurnProcessor } from "./game-turn-processor.class";

export class Game {

    // public gameBoard: GameBoard;

    private _board: GameBoard;
    private _state: GameState;

    public get board(): GameBoard { return this._board; }
    public get configuration(): GameState { return this._state; }
    public get currentPlayer(): Player { return this._state.currentPlayer; }
    public get currentPlayer$(): Observable<Player> { return this._state.currentPlayer$; }
    public get players(): Player[] { return this._state.players; }
    public get playerCount(): number { return this._state.playerCount; }
    public get currentTurn$(): Observable<number> { return this._state.currentTurn$; }
    public get currentTurn(): number { return this._state.currentTurn; }
    public get tiles(): Tile[] { return this._board.tiles; }

    public get selectedTile(): Tile | null { return this._board.selectedTile; }

    constructor(state: GameState) {
        this._state = state;
        this._board = new GameBoard(this._state);
    }
    public startGame(){ GameTurnProcessor.startGame(); }



    public onClickEndTurn() {
        this._state.incrementPlayer();
    }

}