import { Tile } from "./tile.class";
import { XYCoordinates } from "./xy-coordinates.class";

export class TileNeighbourFinder {
    /**
     * Horizontal Hexagon
     * p is point
     * n is neighbour 
     *     
     *                  n0 (-0, -1)
     *     
     * n5 (-1, -0)      p5______p0        n1 (+1, -0)
     *                  /        \
     *               p4/          \p1 
     *                 \          /
     * n4 (-1, +1)      \________/        n2 (+1, +1)
     *                 p3        p2
     *     
     *                  n3 (-0, +1)
     */

    
    private static _getNeighbourCoordinatesOf(tile: Tile): XYCoordinates[] {
        const tilePositionX = tile.hexagon.hexRow;
        const tilePositionY = tile.hexagon.hexCol;
        return [
            {x: tilePositionX-0, y: tilePositionY-1},
            {x: tilePositionX+1, y: tilePositionY-0},
            {x: tilePositionX+1, y: tilePositionY+1},
            {x: tilePositionX-0, y: tilePositionY+1},
            {x: tilePositionX-1, y: tilePositionY+1},
            {x: tilePositionX-1, y: tilePositionY-0},
        ];
    }
    private static _tileAt(coordinates: XYCoordinates, allTiles: Tile[]): Tile | undefined{
        return allTiles.find(tile => tile.hexagon.hexRow === coordinates.x && tile.hexagon.hexCol === coordinates.y);
    }
    private static _getValidNeighbours(neighbourTiles: (Tile | undefined)[]): Tile[] {
        const validNeighbours: Tile[] = [];
        neighbourTiles.forEach(neighbour => {
            if(neighbour !== undefined){
                validNeighbours.push(neighbour);
            }
        })
        return validNeighbours;
    }

    public static getNeighboursOf(tile: Tile, allTiles: Tile[]): Tile[] {
        const neighbourCoords = this._getNeighbourCoordinatesOf(tile);
        const neighbourTiles: (Tile | undefined)[] = neighbourCoords.map(coord => this._tileAt(coord, allTiles));
        const validNeighbourTiles: Tile[] = this._getValidNeighbours(neighbourTiles);
        return validNeighbourTiles;
    }

    public static getOwnedNeighboursOf(ownedByTile: Tile, allTiles: Tile[]): Tile[] {
        const neighbours = this.getNeighboursOf(ownedByTile, allTiles);
        const ownedNeighbours: Tile[] = [];
        neighbours.forEach(neighbour => {
            if (neighbour.isOwned) {
                if (neighbour.tileOwner === ownedByTile.tileOwner) {
                    ownedNeighbours.push(neighbour);
                }
            }
        });
        return ownedNeighbours;
    }
    public static getNeutralNeighboursOf(neighboursOfTile: Tile, allTiles: Tile[]): Tile[] {
        const neighbours = this.getNeighboursOf(neighboursOfTile, allTiles);
        const neutralNeighbours: Tile[] = [];
        neighbours.forEach(neighbour => {
            if (neighbour.isNeutral) {
                neutralNeighbours.push(neighbour);
            }
        });
        return neutralNeighbours;
    }
    public static getOpponentNeighboursOf(neighboursOfTile: Tile, allTiles: Tile[]): Tile[] {
        const neighbours = this.getNeighboursOf(neighboursOfTile, allTiles);
        const ownedNeighbours: Tile[] = [];
        neighbours.forEach(neighbour => {
            if (neighbour.isOwned) {
                if (neighbour.tileOwner !== neighboursOfTile.tileOwner) {
                    ownedNeighbours.push(neighbour);
                }
            }
        });
        return ownedNeighbours;
    }
}