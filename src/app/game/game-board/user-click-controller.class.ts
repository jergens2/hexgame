import { Observable, Subject } from "rxjs";
import { GamePlayer } from "../game-player/game-player.class";
import { Tile } from "./tiles/tile.class";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { UserClickMode } from "./user-click-mode.enum"

export class UserClickController {

    private _userClickMode: UserClickMode = UserClickMode.SELECT_TILES;
    private _tileSelected$: Subject<Tile> = new Subject();

    public get selectedTile$(): Observable<Tile> { return this._tileSelected$.asObservable(); }

    public get modeIsSelectTiles(): boolean { return this._userClickMode === UserClickMode.SELECT_TILES };
    public get modeIsSelectAction(): boolean { return this._userClickMode === UserClickMode.SELECT_ACTION };
    public get modeIsSelectTarget(): boolean { return this._userClickMode === UserClickMode.SELECT_TARGET };
    public get modeIsSelectUnits(): boolean { return this._userClickMode === UserClickMode.SELECT_UNITS };

    constructor() {

    }

    public reset() {
        this._userClickMode = UserClickMode.SELECT_TILES;
        this._tileSelected$.next();
    }

    public leftClick(xy: XYCoordinates, currentPlayer: GamePlayer, tiles: Tile[], canvasWidth: number) {
        if (currentPlayer.isHuman) {
            let closestTile: Tile = tiles[0];
            let smallestDif = canvasWidth;
            tiles.forEach(tile => {
                let diff = tile.hexagon.getDistanceTo(xy);
                let totalDiff = diff.x + diff.y;
                if (totalDiff < smallestDif) {
                    smallestDif = totalDiff;
                    closestTile = tile;
                }
            });
            closestTile.selectTile();
            this._tileSelected$.next(closestTile);
        } else {
            this._userClickMode = UserClickMode.VIEW_TILES;
        }
    }

    public rightClick(xy: XYCoordinates, currentPlayer: GamePlayer, tiles: Tile[], canvasWidth: number) {
        if (currentPlayer.isHuman) {
            let selectedTile: Tile | undefined = tiles.find(tile => tile.isSelected);
            if(selectedTile !== undefined){
                console.log("ooh yea")
            }
        }
    }
}