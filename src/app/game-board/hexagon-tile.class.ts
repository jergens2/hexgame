import { HexagonTileState } from "./hexagon-tile-state.class";
import { XYCoordinates } from "./xy-coordinates.class";

export class HexagonTile {

    /**
     * 
     * Horizontal Hexagon
     *        n0
     * n5  5______0    n1
     *    /        \
     *  4/          \ 1 
     *   \          /
     * n4 \________/    n2
     *    3        2
     *        n3
     * 
     */

    private _point0: XYCoordinates;
    private _point1: XYCoordinates;
    private _point2: XYCoordinates;
    private _point3: XYCoordinates;
    private _point4: XYCoordinates;
    private _point5: XYCoordinates;

    private _neighbour0: XYCoordinates;
    private _neighbour1: XYCoordinates;
    private _neighbour2: XYCoordinates;
    private _neighbour3: XYCoordinates;
    private _neighbour4: XYCoordinates;
    private _neighbour5: XYCoordinates;

    private _centerPoint: XYCoordinates;

    private _hexCol: number;
    private _hexRow: number;

    private _tileState: HexagonTileState;

    public get tileState(): HexagonTileState { return this._tileState; }

    public get point0(): XYCoordinates { return this._point0; }
    public get point1(): XYCoordinates { return this._point1; }
    public get point2(): XYCoordinates { return this._point2; }
    public get point3(): XYCoordinates { return this._point3; }
    public get point4(): XYCoordinates { return this._point4; }
    public get point5(): XYCoordinates { return this._point5; }

    public get neighbour0(): XYCoordinates { return this._neighbour0; }
    public get neighbour1(): XYCoordinates { return this._neighbour1; }
    public get neighbour2(): XYCoordinates { return this._neighbour2; }
    public get neighbour3(): XYCoordinates { return this._neighbour3; }
    public get neighbour4(): XYCoordinates { return this._neighbour4; }
    public get neighbour5(): XYCoordinates { return this._neighbour5; }

    public get neighbours(): XYCoordinates[] {
        return [
            this.neighbour0,
            this.neighbour1,
            this.neighbour2,
            this.neighbour3,
            this.neighbour4,
            this.neighbour5,
        ];
    }

    public get centerPoint(): XYCoordinates { return this._centerPoint; }

    public get hexCol(): number { return this._hexCol; }
    public get hexRow(): number { return this._hexRow; }

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

        this._neighbour0 = { x: hexCol, y: hexRow - 1 };
        this._neighbour1 = { x: hexCol + 1, y: hexRow};
        this._neighbour2 = { x: hexCol + 1, y: hexRow + 1 };
        this._neighbour3 = { x: hexCol, y: hexRow + 1 };
        this._neighbour4 = { x: hexCol - 1, y: hexRow + 1 };
        this._neighbour5 = { x: hexCol - 1, y: hexRow };

        if(hexCol%2 ==0){
            this._neighbour1 = { x: hexCol + 1, y: hexRow-1};
            this._neighbour2 = { x: hexCol + 1, y: hexRow };
            this._neighbour4 = { x: hexCol - 1, y: hexRow };
            this._neighbour5 = { x: hexCol - 1, y: hexRow-1 };
        }

        this._tileState = new HexagonTileState();
    }


    public getDistanceTo(point: XYCoordinates): XYCoordinates {
        let diff: XYCoordinates = {
            x: Math.abs(point.x - this.centerPoint.x),
            y: Math.abs(point.y - this.centerPoint.y)
        }
        return diff;
    }

    public toString(): string {
        return this.hexRow + ', ' + this.hexCol;
    }

    private _color = 'rgb(' + 200 + ', ' + 200 + ', ' + 200 + ')';
    public setColor(color: string) {
        this._color = color;
    }
    public getColor(): string {
        return this._color;
    }
}