import { GameConfiguration } from "./game-configuration.class";
import { GamePlayer } from "./game-player.class";
import { HexagonTile } from "./hexagon-tile.class";
import { XYCoordinates } from "./xy-coordinates.class";

export class GameBoard {


    private _tiles: HexagonTile[] = [];
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _configuration: GameConfiguration;
    
    private _mouseOverTile: HexagonTile | null = null;

    public get canvasWidth(): number { return this._canvasWidth; }
    public get canvasHeight(): number { return this._canvasHeight; }
    public get tiles(): HexagonTile[] { return this._tiles; }
    public get playerCount(): number { return this._configuration.playerCount; }
    public get players(): GamePlayer[] { return this._configuration.players; }
    public get currentPlayer(): GamePlayer { return this._configuration.currentPlayer; }

    public get mouseOverTile(): HexagonTile | null { return this._mouseOverTile; }

    constructor(canvasWidth: number, canvasHeight: number, playerCount?: number) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        if(!playerCount){
            playerCount = 2;
        }
        this._configuration = new GameConfiguration(playerCount);
        this._buildTiles();
    }

    public incrementTurn(){
        this._configuration.incrementTurn();

    }

    public mouseMove(xy: XYCoordinates){
        let closestTile: HexagonTile = this._tiles[0];
        let smallestDif = this.canvasWidth;
        this._tiles.forEach(tile => {
            let diff = tile.getDistanceTo(xy);
            let totalDiff = diff.x + diff.y;
            if (totalDiff < smallestDif) {
                smallestDif = totalDiff;
                closestTile = tile;
            }
        });
        
        let doDraw: boolean = true;
        if(this._mouseOverTile === null){
            this._mouseOverTile = closestTile;
        }else{
            if(this._mouseOverTile.centerPoint === closestTile.centerPoint){
                doDraw = false;
            }
        }
        if(doDraw){
            this._mouseOverTile = closestTile;
        }
        

    }

    public findNeighbours(tile: HexagonTile): HexagonTile[] { 
        const neighbours: HexagonTile[] = [];
        tile.neighbours.forEach(nCoord => {
            const foundTile = this.tiles.find(tile => { return (tile.hexRow == nCoord.y && tile.hexCol == nCoord.x)});
            if(foundTile){
                neighbours.push(foundTile);
            }
        });
        return neighbours;
    }

    public clickBoard(xy: XYCoordinates) {
        let closestTile: HexagonTile = this._tiles[0];
        let smallestDif = this.canvasWidth;
        this._tiles.forEach(tile => {
            let diff = tile.getDistanceTo(xy);
            let totalDiff = diff.x + diff.y;
            if (totalDiff < smallestDif) {
                smallestDif = totalDiff;
                closestTile = tile;
            }
        });

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        closestTile.setColor(this.currentPlayer.color);

        this._incrementTurn();
    }

    private _incrementTurn(){
        this._configuration.incrementTurn();
    }

    private _buildTiles(): void {
        // this.clearBoard();
        const buffer = 2;
        const radius = 10;
        const effectiveRadius = radius + buffer;
        const halfHeight = Math.sqrt(Math.abs(((radius / 2) ** 2) - (radius ** 2))) + (buffer/2);
        const effectiveHeight = (halfHeight * 2) + buffer;
        // in the horizontal configuration, the first column is width of 2*radius and each subsequent column adds an additional width of 1.5 * radius
        // every second column will have minus one height, unless there is additional space at the end.
        let columnsHaveSameHeight: boolean = false;
        let currentWidth = 2 * effectiveRadius;
        let actualWidth = currentWidth;
        const additionalColWidth = 1.5 * effectiveRadius;
        let columnCount = 1;
        while (currentWidth < this.canvasWidth) {
            const remainingWidth = this.canvasWidth - currentWidth;
            if (remainingWidth >= additionalColWidth) {
                currentWidth += additionalColWidth;
                columnCount++;
                actualWidth = currentWidth;
            } else {
                currentWidth = this.canvasWidth + 1;
            }
        }
        let rowCount = Math.floor(this.canvasHeight / effectiveHeight);
        let actualHeight = rowCount * effectiveHeight;
        if ((this.canvasHeight - (rowCount * effectiveHeight)) > halfHeight) {
            columnsHaveSameHeight = true;
            actualHeight += (effectiveHeight / 2);
        }
        const offsetX = (this.canvasWidth - actualWidth) / 2;
        const offsetY = (this.canvasHeight - actualHeight) / 2;
        const tiles: HexagonTile[] = [];
        for (let column = 0; column < columnCount; column++) {
            for (let row = 0; row < rowCount; row++) {
                if (column % 2 == 0) {
                    //if it is an even column
                    let startX = offsetX + effectiveRadius + (column * additionalColWidth);
                    let startY = offsetY + effectiveHeight / 2 + (effectiveHeight * row);
                    tiles.push(new HexagonTile(startX, startY, radius, column, row));
                } else {
                    //if it is an odd column
                    let startX = offsetX + (effectiveRadius * 2) + (column * additionalColWidth) - effectiveRadius;
                    let startY = offsetY + effectiveHeight + (effectiveHeight * row);
                    if (columnsHaveSameHeight) {
                        tiles.push(new HexagonTile(startX, startY, radius, column, row));
                    } else {
                        if (row != rowCount - 1) {
                            tiles.push(new HexagonTile(startX, startY, radius, column, row));
                        }
                    }
                }
            }
        }
        this._tiles = tiles;
    }


}