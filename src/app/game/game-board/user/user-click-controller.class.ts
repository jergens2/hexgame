import { Subject } from "rxjs";
import { Player } from "../../player/player.class";
import { GameBoard } from "../game-board.class";
import { TileActionController } from "../tiles/tile-action-controller.class";
import { TileFinder } from "../tiles/tile-finder.class";
import { Tile } from "../tiles/tile.class";
import { XYCoordinates } from "../tiles/xy-coordinates.class";

export class UserClickController {

    public static leftClick(xy: XYCoordinates, currentPlayer: Player, board: GameBoard, selectedTile: Tile | null): Tile | null {
        let newlySelectedTile: Tile | null = null;
        if (currentPlayer.isHuman) {
            if (selectedTile) {
                board.tiles.forEach(tile => tile.deselectTile());
            }
            const closestTile = this._getClosestTile(xy, board);
            closestTile.selectTile();
            newlySelectedTile = closestTile;
        }
        return newlySelectedTile;
    }

    public static rightClick(xy: XYCoordinates, currentPlayer: Player, board: GameBoard, selectedTile: Tile | null) {
        if (currentPlayer.isHuman) {
            if (selectedTile) {
                if(selectedTile.owner === currentPlayer){
                    const soldiers = selectedTile.unitController.soldiers;
                    if(soldiers.length > 0){
                        const rightClickedTile: Tile = this._getClosestTile(xy, board);
                        const isNeighbour: boolean = TileFinder.tileIsNeighboursOf(selectedTile, rightClickedTile, board.tiles);
                        if(isNeighbour){
                            const isOwned: boolean = rightClickedTile.owner === selectedTile.owner;
                            if(isOwned){
                                TileActionController.moveSoldiers(selectedTile, rightClickedTile);
                            }else{
                                TileActionController.attackTile(selectedTile, rightClickedTile);
                            }
                        }                 
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
