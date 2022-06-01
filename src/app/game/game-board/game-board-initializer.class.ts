import { GamePlayer } from "../game-player/game-player.class";
import { Tile } from "./tiles/tile.class";

export class GameBoardInitializer{

    /** Disable some number of tiles on the board */
    public static disableTiles(tiles: Tile[], tileDisabledRate: number){
        let disableCount: number = Math.floor(tiles.length * tileDisabledRate);
        while (disableCount > 0) {
            const randomIndex: number = Math.floor(Math.random() * tiles.length); 
            tiles[randomIndex].disable();
            disableCount--;
        }
    }

    /** Designate some tiles as Power tiles */
    public static setPowerTiles(tiles: Tile[], tilePoweredCount: number) {
        const enabledTiles = tiles.filter(tile => !tile.isDisabled);
        while (tilePoweredCount > 0) {
            const randomIndex: number = Math.floor(Math.random() * enabledTiles.length);
            enabledTiles[randomIndex].setPowerTile();
            tilePoweredCount--;
        }
    }

    /**
     * 
     * ZANY MODE:
     * occupy every neutral spot randomly and evenly for each player, sort of like how the board game Risk starts
     * 
     */
    public static setPlayerPositions(tiles: Tile[], players: GamePlayer[]) {
        let eligibleTiles = tiles.filter(tile => {
            return (tile.isNeutral && !tile.isDisabled && !tile.isPowerTile)
        });
        const playerCount = players.length;
        let playerIndex = 0;
        while (eligibleTiles.length > 0) {
            let randomIndex = Math.floor(Math.random() * (eligibleTiles.length - 1));
            eligibleTiles[randomIndex].changeOwnership(players[playerIndex]);
            eligibleTiles.splice(randomIndex, 1);
            playerIndex++;
            if (playerIndex == playerCount) {
                playerIndex = 0;
            }
            // eligibleTiles = this.tiles.filter(tile => {
            //     return (tile.isNeutral && !tile.isDisabled && !tile.isPowerTile)
            // });
        }
    }
}