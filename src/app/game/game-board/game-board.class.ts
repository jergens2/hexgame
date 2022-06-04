import { Observable, Subscription } from "rxjs";
import { TileHexagon } from "./tiles/tile-hexagon";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { TileBuilder } from "./tiles/tile-builder.class";
import { Tile } from "./tiles/tile.class";
import { GameState } from "../game-state.class";
import { GameBoardInitializer } from "./game-board-initializer.class";
import { UserClickMode } from "./user/user-click-mode.enum";
import { UserClickController } from "./user/user-click-controller.class";
import { GamePlayer } from "../game-player/game-player.class";

export class GameBoard {

    private _tiles: Tile[] = [];
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _tileRadius: number;
    private _tileBuffer: number;

    public get tiles(): Tile[] { return this._tiles; }
    public get canvasWidth(): number { return this._canvasWidth; }
    public get canvasHeight(): number { return this._canvasHeight; }
    public get tileRadius(): number{ return this._tileRadius; }
    public get tileBuffer(): number { return this._tileBuffer; }
    public get selectedTile(): Tile | undefined { return UserClickController.getSelectedTile(this.tiles); }
    
    constructor(gameState: GameState) {
        this._canvasWidth = gameState.canvasWidth;
        this._canvasHeight = gameState.canvasHeight;
        this._tileRadius = gameState.tileRadius;
        this._tileBuffer = gameState.tileBuffer;
        this._tiles = TileBuilder.buildTiles(this._tileRadius, this._tileBuffer, this._canvasWidth, this._canvasHeight);
        GameBoardInitializer.disableTiles(this.tiles, gameState.tileDisabledRate);
        GameBoardInitializer.setPowerTiles(this.tiles, gameState.tilePoweredCount);
        GameBoardInitializer.setPlayerPositions(this.tiles, gameState.players);
        GameBoardInitializer.placeLeaderUnits(this.tiles, gameState.players);
        gameState.currentTurn$.subscribe(turn => {
            this._tiles.forEach(tile => tile.evaluateProduction())
        });
    }
        
    /** 
     * The board is clicked by the current non-bot player
     */
    public leftClickBoard(xy: XYCoordinates, currentPlayer: GamePlayer) {
        UserClickController.leftClick(xy, currentPlayer, this);
    }
    public rightClickBoard(xy: XYCoordinates, currentPlayer: GamePlayer) {
        UserClickController.rightClick(xy, currentPlayer, this);
    }



}