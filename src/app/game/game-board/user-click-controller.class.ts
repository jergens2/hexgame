import { GamePlayer } from "../game-player/game-player.class";
import { Tile } from "./tiles/tile.class";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { UserClickMode } from "./user-click-mode.enum"

export class UserClickController {

    private _userClickMode: UserClickMode = UserClickMode.SELECT_TILES;

    public get modeIsSelectTiles(): boolean { return this._userClickMode === UserClickMode.SELECT_TILES };
    public get modeIsSelectAction(): boolean { return this._userClickMode === UserClickMode.SELECT_ACTION };
    public get modeIsSelectTarget(): boolean { return this._userClickMode === UserClickMode.SELECT_TARGET };
    public get modeIsSelectUnits(): boolean { return this._userClickMode === UserClickMode.SELECT_UNITS };

    constructor() {

    }

    public reset() {
        this._userClickMode = UserClickMode.SELECT_TILES;
    }

    public clickBoard(xy: XYCoordinates, currentPlayer: GamePlayer, tiles: Tile[], canvasWidth: number) {
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

        } else {
            this._userClickMode = UserClickMode.VIEW_TILES;
        }
    }
}