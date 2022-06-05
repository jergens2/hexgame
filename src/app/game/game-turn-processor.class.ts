import { Player } from "./player/player.class";
import { TileHexagon } from "./game-board/tiles/tile-hexagon";

/**
 * This class handles the logic for processing a player's turn.
 */
export class GameTurnProcessor {

    constructor() {}

    public static startGame(){ 
            // this._state.currentPlayer$.subscribe(player => {
            //     if (player.isBot) {
            //     }
            // });
            // this.currentTurn$.subscribe(turn => {
    
            // });
    }

    /** Process click and return a boolean value indicating whether or not the click is the end of the player's turn */
    public processClick(currentPlayer: Player, clickedTile: TileHexagon, selectedTile: TileHexagon | undefined, allTiles: TileHexagon[]): boolean {
        // let endOfTurn: boolean = false;
        // if (currentPlayer.playerTurnCount === 0) {
        //     if (clickedTile.tileOwner === currentPlayer) {
        //         clickedTile.placeLeader(currentPlayer);
        //         endOfTurn = true;
        //     }
        // } else {
        //     if (clickedTile.tileOwner === currentPlayer) {
        //         if (!clickedTile.isSelected) {
        //             allTiles.forEach(tile => tile.deselectTile());
        //             clickedTile.selectTile();
        //         } else {
        //             clickedTile.deselectTile();
        //         }
        //         endOfTurn = false;
        //     } else {
        //         if (selectedTile) {
        //             if (clickedTile.isNeighbour(selectedTile)) {
        //                 if (clickedTile.isNeutral) {
        //                     clickedTile.takeNeutralTile(currentPlayer, selectedTile);
        //                 } else if (clickedTile.isOwned) {
        //                     clickedTile.attackOwnedTile(currentPlayer, selectedTile);
        //                 }
        //                 endOfTurn = true;
        //             } else {
        //                 console.log("not a neighbour");
        //                 endOfTurn = false;
        //             }
        //         } else {
        //             console.log("no tile was selected")
        //             endOfTurn = false;
        //         }
        //     }
        // }
        // return endOfTurn;
        return false;
    }

}