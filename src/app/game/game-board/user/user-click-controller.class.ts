import { Observable, Subject } from "rxjs";
import { GamePlayer } from "../../game-player/game-player.class";
import { GameBoard } from "../game-board.class";
import { TileActionController } from "../tiles/tile-action-controller.class";
import { TileFinder } from "../tiles/tile-finder.class";
import { Tile } from "../tiles/tile.class";
import { XYCoordinates } from "../tiles/xy-coordinates.class";
import { UserClickMode } from "./user-click-mode.enum"

export class UserClickController {

    public static getSelectedTile(tiles: Tile[]): Tile | undefined {
        return tiles.find(tile => tile.isSelected);
    }

    public static leftClick(xy: XYCoordinates, currentPlayer: GamePlayer, board: GameBoard) {
        if (currentPlayer.isHuman) {
            if (this.getSelectedTile(board.tiles)) {
                board.tiles.forEach(tile => tile.deselectTile());
            }
            const closestTile = this._getClosestTile(xy, board);
            closestTile.selectTile();
        }
    }

    public static rightClick(xy: XYCoordinates, currentPlayer: GamePlayer, board: GameBoard) {
        if (currentPlayer.isHuman) {
            const selectedTile = this.getSelectedTile(board.tiles);
            if (selectedTile) {
                const soldiers = selectedTile.unitController.soldiers;
                if(soldiers.length > 0){
                    const rightClickedTile: Tile = this._getClosestTile(xy, board);
                    const isNeighbour: boolean = TileFinder.tileIsNeighboursOf(selectedTile, rightClickedTile, board.tiles);
                    if(isNeighbour){
                        TileActionController.attackTile(selectedTile, rightClickedTile);
                    }else{
                        //not a neighbour, invalid attack
                    }
                }

            }
        }
    }

    private static _getClosestTile(xy: XYCoordinates, board: GameBoard): Tile {
        let closestTile: Tile = board.tiles[0];
        let smallestDif = board.canvasWidth;
        board.tiles.forEach(tile => {
            let diff = tile.hexagon.getDistanceTo(xy);
            let totalDiff = diff.x + diff.y;
            if (totalDiff < smallestDif) {
                smallestDif = totalDiff;
                closestTile = tile;
            }
        });
        return closestTile;
    }
}