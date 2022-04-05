import { ColorCalculator } from "../color/color-calulator.class";
import { GamePlayer } from "./game-player.class";
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

    private _neighbour0Coord: XYCoordinates;
    private _neighbour1Coord: XYCoordinates;
    private _neighbour2Coord: XYCoordinates;
    private _neighbour3Coord: XYCoordinates;
    private _neighbour4Coord: XYCoordinates;
    private _neighbour5Coord: XYCoordinates;

    private _neighbour0: HexagonTile | null = null;
    private _neighbour1: HexagonTile | null = null;
    private _neighbour2: HexagonTile | null = null;
    private _neighbour3: HexagonTile | null = null;
    private _neighbour4: HexagonTile | null = null;
    private _neighbour5: HexagonTile | null = null;

    private _centerPoint: XYCoordinates;

    private _hexCol: number;
    private _hexRow: number;

    private _tileState: HexagonTileState;

    public get tileState(): HexagonTileState { return this._tileState; }
    public get powerValue(): number { return this._tileState.powerValue; }
    /**
     *  Val = 2, Level = 2
        Val = 4, Level = 3
        Val = 8, Level = 4
        Val = 16, Level = 5
        Val = 32, Level = 6
        Val = 64, Level = 7
        Val = 128, Level = 8
        Val = 256, Level = 9
     */
    public get powerLevel(): number { return this._tileState.powerLevel; }
    public get growValue(): number { return this._tileState.powerValue / 10; }
    public get growthAccumulation(): number { return this._tileState.growthAccumulation; }
    public get tileOwner(): GamePlayer { return this.tileState.ownedBy; }
    public get isOwned(): boolean { return !this.tileState.isNeutral; }
    public get isNeutral(): boolean { return this.tileState.isNeutral; }
    public get isDisabled(): boolean { return this.tileState.isDisabled; }
    public get isPowerTile(): boolean { return this.tileState.isPowerSource; }

    public get point0(): XYCoordinates { return this._point0; }
    public get point1(): XYCoordinates { return this._point1; }
    public get point2(): XYCoordinates { return this._point2; }
    public get point3(): XYCoordinates { return this._point3; }
    public get point4(): XYCoordinates { return this._point4; }
    public get point5(): XYCoordinates { return this._point5; }

    public get neighbour0Coords(): XYCoordinates { return this._neighbour0Coord; }
    public get neighbour1Coords(): XYCoordinates { return this._neighbour1Coord; }
    public get neighbour2Coords(): XYCoordinates { return this._neighbour2Coord; }
    public get neighbour3Coords(): XYCoordinates { return this._neighbour3Coord; }
    public get neighbour4Coords(): XYCoordinates { return this._neighbour4Coord; }
    public get neighbour5Coords(): XYCoordinates { return this._neighbour5Coord; }  
    public get neighbour0(): HexagonTile | null { return this._neighbour0; }
    public get neighbour1(): HexagonTile | null { return this._neighbour1; }
    public get neighbour2(): HexagonTile | null { return this._neighbour2; }
    public get neighbour3(): HexagonTile | null { return this._neighbour3; }
    public get neighbour4(): HexagonTile | null { return this._neighbour4; }
    public get neighbour5(): HexagonTile | null { return this._neighbour5; }
    public get neighbourCoords(): XYCoordinates[] {
        return [
            this.neighbour0Coords,
            this.neighbour1Coords,
            this.neighbour2Coords,
            this.neighbour3Coords,
            this.neighbour4Coords,
            this.neighbour5Coords,
        ];
    }
    public get neighbours(): (HexagonTile | null)[] { 
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

        this._neighbour0Coord = { x: hexCol, y: hexRow - 1 };
        this._neighbour1Coord = { x: hexCol + 1, y: hexRow};
        this._neighbour2Coord = { x: hexCol + 1, y: hexRow + 1 };
        this._neighbour3Coord = { x: hexCol, y: hexRow + 1 };
        this._neighbour4Coord = { x: hexCol - 1, y: hexRow + 1 };
        this._neighbour5Coord = { x: hexCol - 1, y: hexRow };

        if(hexCol%2 ==0){
            this._neighbour1Coord = { x: hexCol + 1, y: hexRow-1};
            this._neighbour2Coord = { x: hexCol + 1, y: hexRow };
            this._neighbour4Coord = { x: hexCol - 1, y: hexRow };
            this._neighbour5Coord = { x: hexCol - 1, y: hexRow-1 };
        }

        this._tileState = {
            isNeutral: true,
            isDisabled: false,
            isPowerSource: false,
            ownedBy: new GamePlayer('',''),
            powerValue: 0,
            powerLevel: 0,
            growthAccumulation: 0,
        };
    }

    /** returns a boolean indicating whether or not the tile click action was valid */
    public clickTile(player: GamePlayer): boolean{
        let isValid = true;
        if(this.isNeutral && !this.isDisabled && !this.isPowerTile){
            this._tileState.ownedBy = player;
            this._tileState.powerValue = 1;
            this._tileState.isNeutral = false;
            this._fillColor = player.baseColor;
        }else{
            if(this.tileOwner === player){
                this.incrementPowerValue();
                
            }else{
                isValid = false;
            }
        }
        return isValid;
    }

    public incrementPowerValue(){
        this._tileState.powerValue ++;
        let powerLevel = 0;
        if(this.powerValue === 1){
            powerLevel = 1;
            // Val = 1, Level = 1
        }else if(this.powerValue > 1){
            // Val = 2, Level = 2
            // Val = 4, Level = 3
            // Val = 8, Level = 4
            // Val = 16, Level = 5
            // Val = 32, Level = 6
            // Val = 64, Level = 7
            // Val = 128, Level = 8
            // Val = 256, Level = 9
            let exponent = 1;
            let currentMax = 2 ** exponent;
            let valueFound = this.powerValue < currentMax;
            while(!valueFound){
                if(this.powerValue < currentMax){
                    valueFound = true;
                }else{
                    exponent++;
                    currentMax = 2 ** exponent;
                }
            }
            powerLevel = exponent;
        }       
        this._tileState.powerLevel = powerLevel;
        this._updateFillColor();
    }

    public incrementTurn(){

    }

    public setNeighbours(neighbours: HexagonTile[]){
        this._neighbour0 = neighbours[0];
        this._neighbour1 = neighbours[1];
        this._neighbour2 = neighbours[2];
        this._neighbour3 = neighbours[3];
        this._neighbour4 = neighbours[4];
        this._neighbour5 = neighbours[5];
    }

    public getDistanceTo(point: XYCoordinates): XYCoordinates {
        let diff: XYCoordinates = {
            x: Math.abs(point.x - this.centerPoint.x),
            y: Math.abs(point.y - this.centerPoint.y)
        }
        return diff;
    }

    public disable(){
        this._tileState.isDisabled = true;
    }
    public setPowerTile(){
        this._tileState.isPowerSource = true;
    }

    public toString(): string {
        return this.hexRow + ', ' + this.hexCol;
    }

    private _fillColor = 'rgb(' + 250 + ', ' + 250 + ', ' + 250 + ')';
    private _updateFillColor(){
        let baseColor: string = 'rgb(' + 250 + ', ' + 250 + ', ' + 250 + ')'
        if(this.isOwned){
            baseColor = this.tileOwner.baseColor;
        }
        this._fillColor = ColorCalculator.calculateColor(baseColor, this.powerLevel);
    }
    public get fillColor(): string {
        return this._fillColor;
    }
}