import { Tile } from "./tile.class";
import { XYCoordinates } from "./xy-coordinates.class";

export class TileFinder {
    /**
     * Horizontal Hexagon
     * p is point
     * n is neighbour 
     *     
     *                      n0 
     *     
     *         n5       p5______p0        n1 
     *                  /        \
     *               p4/          \p1 
     *                 \          /
     *          n4      \________/        n2 
     *                 p3        p2
     *     
     *                      n3
     */

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
                if (neighbour.owner === ownedByTile.owner) {
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
                if (neighbour.owner !== neighboursOfTile.owner) {
                    ownedNeighbours.push(neighbour);
                }
            }
        });
        return ownedNeighbours;
    }

    public static tileIsNeighboursOf(tile: Tile, compareTile: Tile, allTiles: Tile[] ): boolean { 
        const neighbours = this.getNeighboursOf(tile, allTiles);
        let isNeighbour: boolean = false;
        neighbours.forEach(neighbour => {
            if(neighbour.isSame(compareTile.hexagon)){
                isNeighbour = true;
            }
        });
        return isNeighbour;
    }


    /**
     *  refer to horizontal_heagon_grid.png
     *  this function returns an array of "XYCoordinates", where the X represents hexColumn and the Y represents hexRow
     */
    private static _getNeighbourCoordinatesOf(tile: Tile): XYCoordinates[] {
        const tilePositionX = tile.hexagon.hexCol;
        const tilePositionY = tile.hexagon.hexRow;
        const columnIsEven = tilePositionX % 2 == 0;
        const columnIsOdd = !columnIsEven;
        let coordinates: XYCoordinates[] = [];
        if(columnIsEven){
            coordinates = [
                { x: tilePositionX - 0, y: tilePositionY - 1 },
                { x: tilePositionX + 1, y: tilePositionY - 1 },
                { x: tilePositionX + 1, y: tilePositionY + 0 },
                { x: tilePositionX + 0, y: tilePositionY + 1 },
                { x: tilePositionX - 1, y: tilePositionY - 0 },
                { x: tilePositionX - 1, y: tilePositionY - 1 },
            ];
        }else if(columnIsOdd){
            coordinates = [
                { x: tilePositionX - 0, y: tilePositionY - 1 },
                { x: tilePositionX + 1, y: tilePositionY - 0 },
                { x: tilePositionX + 1, y: tilePositionY + 1 },
                { x: tilePositionX - 0, y: tilePositionY + 1 },
                { x: tilePositionX - 1, y: tilePositionY + 1 },
                { x: tilePositionX - 1, y: tilePositionY - 0 },
            ];
        }
        return coordinates;
    }
    private static _tileAt(coordinates: XYCoordinates, allTiles: Tile[]): Tile | undefined {
        return allTiles.find(tile => tile.hexagon.hexCol === coordinates.x && tile.hexagon.hexRow === coordinates.y);
    }
    private static _getValidNeighbours(neighbourTiles: (Tile | undefined)[]): Tile[] {
        const validNeighbours: Tile[] = [];
        neighbourTiles.forEach(neighbour => {
            if (neighbour !== undefined) {
                validNeighbours.push(neighbour);
            }
        })
        return validNeighbours;
    }




}