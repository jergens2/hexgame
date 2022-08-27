import { Player } from "../player/player.class";
import { Tile } from "./tiles/tile.class";
import { XYCoordinates } from "./tiles/xy-coordinates.class";
import { LeaderUnit } from "./units/leader-unit.class";

export class GameBoardInitializer {

    /** Disable some number of tiles on the board */
    public static disableTiles(tiles: Tile[], tileDisabledRate: number) {

    }

    /** Distribute 'Resourcium' to every tile */
    public static setTileResorsium(tiles: Tile[]) {
        /**
         * General concept: 
         * assuming average value of 20 per tile times (50x50) tiles gives a total of approximately 50,000 Resourcium
         * from 50,000 down to 0, go to each tile and check if tile receives 1 Resourcium based on their probability of receiving
         * probability of receiving is derived from distance to the center (could be distance to any point)
         */
        console.log("STARTING");

        const averageResorsium = 20;
        let remainingToDistribute = averageResorsium * tiles.length;

        let maxDistance: number = 0;
        let maxHexRow: number = 0;
        let maxHexCol: number = 0;
        const centerTile = this._findCenterTile(tiles);
        if (centerTile) {
            const centerPoint = centerTile?.hexagon.centerPoint;
            const measuredTiles: { tile: Tile, distance: number, probability: number, resourcium: number }[] = [];
            tiles.forEach(tile => {
                const tileDistance: number = this._calculateDistanceFrom(tile, centerPoint);
                if (tileDistance > maxDistance) {
                    maxDistance = tileDistance;
                }
                if (tile.hexagon.hexRow > maxHexRow) {
                    maxHexRow = tile.hexagon.hexRow;
                }
                if (tile.hexagon.hexCol > maxHexCol) {
                    maxHexCol = tile.hexagon.hexCol;
                }
                measuredTiles.push({ tile: tile, distance: tileDistance, probability: -1, resourcium: -1 });
            });
            measuredTiles.forEach(measuredTile => {
                const percentOfMax = (measuredTile.distance / maxDistance);
                measuredTile.probability = 1 - percentOfMax;
            });
            let currentRow = 0;
            let currentCol = 0;
            let iteration = 0;
            while (remainingToDistribute > 0) {
                // console.log(remainingToDistribute)
                const tileAt = this._tileAt(currentRow, currentCol, measuredTiles);
                const giveResourcium: boolean = this._testProbability(tileAt.probability);
                if(giveResourcium){
                    tileAt.tile.tileState.resourcium+=10;
                    remainingToDistribute-=10;
                }
                currentRow++;
                if (currentRow > maxHexRow) {
                    currentRow = 0;
                    currentCol++;
                }
                if (currentCol > maxHexCol) {
                    currentRow = 0;
                    currentCol = 0;
                }
                iteration++;
            }
            console.log("ITERATIONS: " + iteration)
        } else {
            console.log("error finding center tile")
        }
        console.log("COMPLETED DISTRIBUTION")
    }

    private static _testProbability(probability: number): boolean {
        const randomNumber = Math.random();
        if (probability >= randomNumber) {
            return true;
        }
        return false;
    }
    private static _tileAt(hexRow: number, hexCol: number, measuredTiles: { tile: Tile, distance: number, probability: number, resourcium: number }[]): { tile: Tile, distance: number, probability: number, resourcium: number } {
        let tileFound = measuredTiles[0];
        measuredTiles.forEach(measuredTile => {
            if (measuredTile.tile.hexagon.hexRow === hexRow && measuredTile.tile.hexagon.hexCol === hexCol) {
                tileFound = measuredTile;
            }
        });
        return tileFound;
    }

    private static _findCenterTile(tiles: Tile[]): Tile | undefined {
        const maxRow = tiles[tiles.length - 1].hexagon.hexRow;
        const maxCol = tiles[tiles.length - 1].hexagon.hexCol;
        const halfRow = Math.floor(maxRow / 2);
        const halfCol = Math.floor(maxCol / 2);
        const centerTile = tiles.find(tile => {
            return tile.hexagon.hexRow === halfRow && tile.hexagon.hexCol === halfCol;
        });
        return centerTile
    }

    private static _calculateDistanceFrom(tile: Tile, point: XYCoordinates): number {
        const tileCenter = tile.hexagon.centerPoint;
        const distanceX = Math.abs(tileCenter.x - point.x);
        const distanceY = Math.abs(tileCenter.y - point.y);
        const hypotenuse = Math.sqrt((distanceX ** 2) + (distanceY ** 2));
        return hypotenuse;
    }

    /**
     * 
     * ZANY MODE:
     * occupy every neutral spot randomly and evenly for each player, sort of like how the board game Risk starts
     * 
     */
    public static setPlayerPositions(tiles: Tile[], players: Player[]) {
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


    public static placeLeaderUnits(tiles: Tile[], players: Player[]) {
        players.forEach(player => {
            const playerTiles = tiles.filter(tile => tile.owner === player);
            const randomIndex = Math.floor(Math.random() * (playerTiles.length - 1));
            const leader: LeaderUnit = new LeaderUnit(player);
            playerTiles[randomIndex].placeLeader(leader);
        })
    }


}
