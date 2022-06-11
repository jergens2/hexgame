import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { TileHexagon } from "./tiles/tile-hexagon";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { TileBuilder } from "./tiles/tile-builder.class";
import { Tile } from "./tiles/tile.class";
import { GameState } from "../game-state.class";
import { GameBoardInitializer } from "./game-board-initializer.class";
import { UserClickMode } from "./user/user-click-mode.enum";
import { UserClickController } from "./user/user-click-controller.class";
import { Player } from "../player/player.class";

export class GameBoard {

    private _tiles: Tile[] = [];
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _tileRadius: number;
    private _tileBuffer: number;

    private _gameState: GameState;

    private _selectedTile$: BehaviorSubject<Tile | null> = new BehaviorSubject<Tile | null>(null);
    private _updateTileUnits$: Subject<any> = new Subject();

    public get tiles(): Tile[] { return this._tiles; }
    public get canvasWidth(): number { return this._canvasWidth; }
    public get canvasHeight(): number { return this._canvasHeight; }
    public get tileRadius(): number { return this._tileRadius; }
    public get tileBuffer(): number { return this._tileBuffer; }
    public get selectedTile(): Tile | null { return this._selectedTile$.getValue(); }
    public get selectedTile$(): Observable<Tile | null> { return this._selectedTile$.asObservable(); }
    public get updateTileUnits$(): Observable<any> { return this._updateTileUnits$.asObservable(); }

    constructor(gameState: GameState) {
        this._gameState = gameState;
        this._canvasWidth = gameState.canvasWidth;
        this._canvasHeight = gameState.canvasHeight;
        this._tileRadius = gameState.tileRadius;
        this._tileBuffer = gameState.tileBuffer;
        this._tiles = TileBuilder.buildTiles(this._tileRadius, this._tileBuffer, this._canvasWidth, this._canvasHeight);
        GameBoardInitializer.disableTiles(this.tiles, gameState.tileDisabledRate);
        GameBoardInitializer.setPowerTiles(this.tiles, gameState.tilePoweredCount);
        GameBoardInitializer.setPlayerPositions(this.tiles, gameState.players);
        GameBoardInitializer.placeLeaderUnits(this.tiles, gameState.players);
        this._gameState.currentTurn$.subscribe(turn => {
            this._tiles.forEach(tile => {
                tile.evaluateProduction();
                tile.endOfTurn();
            });
            this._reselectTileUnits();
        });
        this._gameState.currentPlayer$.subscribe(player => this._reselectTileUnits());
    }

    private _reselectTileUnits(): void {
        if (this.selectedTile) {
            this.selectedTile.selectTile(this._gameState.currentPlayer);
            this._selectedTile$.next(this.selectedTile);
            this._updateTileUnits$.next();
        }
    }

    /** 
     * The board is clicked by the current non-bot player
     */
    public leftClickBoard(xy: XYCoordinates, currentPlayer: Player) {
        UserClickController.leftClick(xy, currentPlayer, this, this.selectedTile);
        this._updateSelectedTile();
    }
    public rightClickBoard(xy: XYCoordinates, currentPlayer: Player) {
        UserClickController.rightClick(xy, currentPlayer, this, this.selectedTile);
        this._updateSelectedTile();
    }


    private _updateSelectedTile(){
        const selectedTile = this.tiles.find(tile => tile.isSelected);
        if(selectedTile){
            this._selectedTile$.next(selectedTile);
        }else{
            this._selectedTile$.next(null);
        }
    }
}