import { XYCoordinates } from "./xy-coordinates.class";

export class HexagonTile{
    
    /**
     * 
     * Horizontal Hexagon
     * 
     *     5______0
     *    /        \
     *  4/          \ 1 
     *   \          /
     *    \________/
     *    3        2
     * 
     * 
     */
    
    private _point0: XYCoordinates;
    private _point1: XYCoordinates;
    private _point2: XYCoordinates;
    private _point3: XYCoordinates;
    private _point4: XYCoordinates;
    private _point5: XYCoordinates;

    public get point0(): XYCoordinates{ return this._point0; }
    public get point1(): XYCoordinates{ return this._point1; }
    public get point2(): XYCoordinates{ return this._point2; }
    public get point3(): XYCoordinates{ return this._point3; }
    public get point4(): XYCoordinates{ return this._point4; }
    public get point5(): XYCoordinates{ return this._point5; }
    
    
    /**
     * 
     * @param centerX the x coordinate at the center of the Hexagon
     * @param centerY the y coordinate at the center of the Hexagon
     * @param radius radius of the hexagon
     */
    constructor(centerX: number, centerY: number, radius: number){
        // halfHeight is half of the height of a horizontal hexagon
        const halfHeight = Math.sqrt(Math.abs(((radius / 2) ** 2) - (radius ** 2)));
        let currentX = centerX + (radius/2);
        let currentY = centerY - halfHeight;
        this._point0 = {x: currentX, y:currentY};
        currentX = centerX + radius
        currentY = centerY;
        this._point1 = {x: currentX, y:currentY};
        currentX = centerX + (radius/2);
        currentY = centerY + halfHeight;
        this._point2 = {x: currentX, y:currentY};
        currentX = centerX - (radius/2);
        currentY = centerY + halfHeight;
        this._point3 = {x: currentX, y:currentY};
        currentX = centerX - radius;
        currentY = centerY;
        this._point4 = {x: currentX, y:currentY};
        currentX = centerX - (radius/2);
        currentY = centerY - halfHeight;
        this._point5 = {x: currentX, y:currentY};
    }
}