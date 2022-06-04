import { XYCoordinates } from "./xy-coordinates.class";

export class TileHexagon {

    /**
     * Horizontal Hexagon
     * n is neighbour 
     * 
     *          n0
     *   n5  5______0    n1
     *      /        \
     *    4/          \ 1 
     *     \          /
     *   n4 \________/    n2
     *      3        2
     *          n3
     */

    /**
     * 
     * @param centerX the x coordinate at the center of the Hexagon
     * @param centerY the y coordinate at the center of the Hexagon
     * @param radius radius of the hexagon
     */
    constructor(centerX: number, centerY: number, radius: number, hexCol: number, hexRow: number) {
        // halfHeight is half of the height of a horizontal hexagon
        this._centerPoint = { x: centerX, y: centerY };
        this._hexRow = hexRow;
        this._hexCol = hexCol;
        const halfHeight = Math.sqrt(Math.abs(((radius / 2) ** 2) - (radius ** 2)));
        let currentX = centerX + (radius / 2);
        let currentY = centerY - halfHeight;
        this._point0 = { x: currentX, y: currentY };
        currentX = centerX + radius
        currentY = centerY;
        this._point1 = { x: currentX, y: currentY };
        currentX = centerX + (radius / 2);
        currentY = centerY + halfHeight;
        this._point2 = { x: currentX, y: currentY };
        currentX = centerX - (radius / 2);
        currentY = centerY + halfHeight;
        this._point3 = { x: currentX, y: currentY };
        currentX = centerX - radius;
        currentY = centerY;
        this._point4 = { x: currentX, y: currentY };
        currentX = centerX - (radius / 2);
        currentY = centerY - halfHeight;
        this._point5 = { x: currentX, y: currentY };
    }

    private _point0: XYCoordinates;
    private _point1: XYCoordinates;
    private _point2: XYCoordinates;
    private _point3: XYCoordinates;
    private _point4: XYCoordinates;
    private _point5: XYCoordinates;
    private _centerPoint: XYCoordinates;
    private _hexCol: number;
    private _hexRow: number;

    public get point0(): XYCoordinates { return this._point0; }
    public get point1(): XYCoordinates { return this._point1; }
    public get point2(): XYCoordinates { return this._point2; }
    public get point3(): XYCoordinates { return this._point3; }
    public get point4(): XYCoordinates { return this._point4; }
    public get point5(): XYCoordinates { return this._point5; }
    public get centerPoint(): XYCoordinates { return this._centerPoint; }
    public get hexCol(): number { return this._hexCol; }
    public get hexRow(): number { return this._hexRow; }
    public get hexCoordinates(): XYCoordinates { return {x: this.hexCol, y: this.hexRow}; }

    public isSame(otherTile: TileHexagon): boolean {
        return otherTile.centerPoint.x === this.centerPoint.x && otherTile.centerPoint.y === this.centerPoint.y;
    }

    public getDistanceTo(point: XYCoordinates): XYCoordinates {
        let diff: XYCoordinates = {
            x: Math.abs(point.x - this.centerPoint.x),
            y: Math.abs(point.y - this.centerPoint.y)
        }
        return diff;
    }

    public toString(): string {
        return this.hexCol + ', ' + this.hexRow;
    }

    private _fillColor = 'rgb(' + 250 + ', ' + 250 + ', ' + 250 + ')';
    private _strokeWidth: number = 1;
    // private _updateFillColor() {
    //     // let baseColor: string = 'rgb(' + 250 + ', ' + 250 + ', ' + 250 + ')'
    //     // if (this.isOwned) {
    //     //     baseColor = this.tileOwner.baseColor;
    //     // }
    //     // this._fillColor = ColorCalculator.calculateColor(baseColor, this.tileState.energyValue);
    // }
    public get fillColor(): string { return this._fillColor; }
    public get strokeWidth(): number { return this._strokeWidth; }
}