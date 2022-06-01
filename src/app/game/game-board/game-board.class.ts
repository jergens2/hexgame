import { Subscription } from "rxjs";
import { TileHexagon } from "./tiles/tile-hexagon";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { TileBuilder } from "./tiles/tile-builder.class";
import { Tile } from "./tiles/tile.class";
import { GameState } from "../game-state.class";
import { GameBoardInitializer } from "./game-board-initializer.class";

export class GameBoard {

    private _tiles: Tile[] = [];
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _tileRadius: number;
    private _tileBuffer: number;

    public get tiles(): Tile[] { return this._tiles; }


    private _mouseOverTile: TileHexagon | null = null;
    public get mouseOverTile(): TileHexagon | null { return this._mouseOverTile; }

    constructor(gameState: GameState) {
        this._canvasWidth = gameState.canvasWidth;
        this._canvasHeight = gameState.canvasHeight;
        this._tileRadius = gameState.tileRadius;
        this._tileBuffer = gameState.tileBuffer;
        this._tiles = TileBuilder.buildTiles(this._tileRadius, this._tileBuffer, this._canvasWidth, this._canvasHeight);
        GameBoardInitializer.disableTiles(this.tiles, gameState.tileDisabledRate);
        GameBoardInitializer.setPowerTiles(this.tiles, gameState.tilePoweredCount);
        GameBoardInitializer.setPlayerPositions(this.tiles, gameState.players);
    }
        
    /** 
     * The board is clicked by the current non-bot player
     */
    public clickBoard(xy: XYCoordinates) {
        let closestTile: Tile = this._tiles[0];
        let smallestDif = this._canvasWidth;
        this._tiles.forEach(tile => {
            let diff = tile.hexagon.getDistanceTo(xy);
            let totalDiff = diff.x + diff.y;
            if (totalDiff < smallestDif) {
                smallestDif = totalDiff;
                closestTile = tile;
            }
        });
        let selectedTile: Tile | undefined = this.tiles.find(tile => tile.isSelected);
    }


}