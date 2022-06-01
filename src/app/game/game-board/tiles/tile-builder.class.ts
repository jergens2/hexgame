import { TileHexagon } from "./tile-hexagon";
import { Tile } from "./tile.class";

export class TileBuilder{
    
    public static buildTiles(tileRadius: number, tileBuffer: number, canvasWidth: number, canvasHeight: number): Tile[]{

        const effectiveRadius = tileRadius + tileBuffer;
        const halfHeight = Math.sqrt(Math.abs(((tileRadius / 2) ** 2) - (tileRadius ** 2))) + (tileBuffer / 2);
        const effectiveHeight = (halfHeight * 2) + tileBuffer;
        // in the horizontal configuration, the first column is width of 2*radius and each subsequent column adds an additional width of 1.5 * radius
        // every second column will have minus one height, unless there is additional space at the end.
        let columnsHaveSameHeight: boolean = false;
        let currentWidth = 2 * effectiveRadius;
        let actualWidth = currentWidth;
        const additionalColWidth = 1.5 * effectiveRadius;
        let columnCount = 1;
        while (currentWidth < canvasWidth) {
            const remainingWidth = canvasWidth - currentWidth;
            if (remainingWidth >= additionalColWidth) {
                currentWidth += additionalColWidth;
                columnCount++;
                actualWidth = currentWidth;
            } else {
                currentWidth = canvasWidth + 1;
            }
        }
        let rowCount = Math.floor(canvasHeight / effectiveHeight);
        let actualHeight = rowCount * effectiveHeight;
        if ((canvasHeight - (rowCount * effectiveHeight)) > halfHeight) {
            columnsHaveSameHeight = true;
            actualHeight += (effectiveHeight / 2);
        }
        const offsetX = (canvasWidth - actualWidth) / 2; 
        const offsetY = (canvasHeight - actualHeight) / 2;
        const hexTiles: TileHexagon[] = [];
        for (let column = 0; column < columnCount; column++) {
            for (let row = 0; row < rowCount; row++) {
                if (column % 2 == 0) {
                    //if it is an even column
                    let startX = offsetX + effectiveRadius + (column * additionalColWidth);
                    let startY = offsetY + effectiveHeight / 2 + (effectiveHeight * row);
                    hexTiles.push(new TileHexagon(startX, startY, tileRadius, column, row));
                } else {
                    //if it is an odd column
                    let startX = offsetX + (effectiveRadius * 2) + (column * additionalColWidth) - effectiveRadius;
                    let startY = offsetY + effectiveHeight + (effectiveHeight * row);
                    if (columnsHaveSameHeight) {
                        hexTiles.push(new TileHexagon(startX, startY, tileRadius, column, row));
                    } else {
                        if (row != rowCount - 1) {
                            hexTiles.push(new TileHexagon(startX, startY, tileRadius, column, row));
                        }
                    }
                }
            }
        }
        const tiles = hexTiles.map(hexTile => new Tile(hexTile));
        return tiles;
    }
}