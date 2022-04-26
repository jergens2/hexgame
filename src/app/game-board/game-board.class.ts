import { Observable, Subject, timer } from "rxjs";
import { GameBoardMap } from "./game-board-map.class";
import { GameConfiguration } from "./game-configuration.class";
import { GamePlayer } from "./game-player.class";
import { HexagonTile } from "./hexagon-tile.class";
import { XYCoordinates } from "./xy-coordinates.class";

export class GameBoard {
    private _tiles: HexagonTile[] = [];
    private _configuration: GameConfiguration;
    private _mouseOverTile: HexagonTile | null = null;
    private _currentTurn$: Subject<number>;

    public get canvasWidth(): number { return this._configuration.canvasWidth; }
    public get canvasHeight(): number { return this._configuration.canvasHeight; }
    public get tiles(): HexagonTile[] { return this._tiles; }
    public get playerCount(): number { return this._configuration.playerCount; }
    public get players(): GamePlayer[] { return this._configuration.players; }
    public get currentPlayer(): GamePlayer { return this._configuration.currentPlayer; }
    public get tileRadius(): number { return this._configuration.tileRadius; }
    public get tileBuffer(): number { return this._configuration.tileBuffer; }
    public get tileDisabledRate(): number { return this._configuration.tileDisabledRate; }
    public get tilePoweredCount(): number { return this._configuration.tilePoweredCount; }

    public get currentTurn$(): Observable<number> { return this._currentTurn$.asObservable(); }

    public get mouseOverTile(): HexagonTile | null { return this._mouseOverTile; }

    constructor() {
        this._configuration = this._configureGame();
        this._buildTiles();
        this._disableTiles();
        this._setPowerTiles();
        this._setPlayerPositions();
        this._currentTurn$ = new Subject();
        this.currentTurn$.subscribe(turn => {
            if (this.currentPlayer.isBot) {
                timer(10).subscribe(() => {
                    this.takeBotTurn();
                    this.incrementTurn();
                })
            }
        })
    }
    private _configureGame(): GameConfiguration{
        const playerCount: number = 6;
        const canvasWidth: number = 768;
        const canvasHeight: number = 768;
        const tileRadius: number = 10;
        const tileBuffer: number = 2;
        const tileDisabledRate: number = 0.05;
        const tilePoweredCount: number = (2 * playerCount) + 1;
        return new GameConfiguration(playerCount, canvasWidth, canvasHeight, tileRadius, tileBuffer, tileDisabledRate, tilePoweredCount);
    }

    public startGame() {
        if (this.currentPlayer.isBot) {
            this.takeBotTurn();
            this.incrementTurn();
        }
    }

    public incrementTurn() {
        // console.log("Current turn: ", this._configuration.currentTurn);
        if (this._configuration.currentTurn < 1000) {


            if (this.currentPlayer.isBot) {
                this.takeBotTurn();
            }
            this._tiles.forEach(tile => {
            tile.tileState.growthAccumulation += tile.growValue;
            let accumulatedGrowth = tile.growthAccumulation;
            if (accumulatedGrowth >= 1) {
                let growCount = 0;
                let neighbours: HexagonTile[] = [];
                tile.neighbours.forEach(n => {
                    if (n !== null && n !== undefined) {
                        neighbours.push(n);
                    }
                });
                // console.log("Neighbours: ", neighbours)
                if (neighbours.length > 0) {
                    neighbours = neighbours.filter(n => (n.isNeutral || n.tileOwner === tile.tileOwner));
                    if (neighbours.length > 0) {
                        for (let i = 0; i < Math.floor(accumulatedGrowth); i++) {
                            let randomIndex = Math.floor(Math.random() * neighbours.length);
                            // console.log("Random index, Neighbours.length", randomIndex, neighbours.length)
                            neighbours[randomIndex].clickTile(tile.tileOwner);
                            growCount++;
                        }
                        accumulatedGrowth = accumulatedGrowth - growCount;
                        tile.tileState.growthAccumulation = accumulatedGrowth;
                    }
                }
            }
        });
            this._configuration.incrementTurn();
            this._currentTurn$.next(this._configuration.currentTurn);
        } else {
            console.log("Game over", this._configuration.currentTurn);
        }


    }

    public takeBotTurn() {

        const ownedTiles: HexagonTile[] = this.tiles.filter(tile => tile.tileOwner === this.currentPlayer);
        const eligibleTiles: HexagonTile[] = [...ownedTiles];
        ownedTiles.forEach(ownedTile => {
            ownedTile.neighbours.forEach(neighbour => {
                if (neighbour !== null && neighbour !== undefined) {
                    if (!neighbour.isDisabled && !neighbour.isPowerTile && neighbour.isNeutral) {
                        let alreadyCounted: boolean = false;
                        eligibleTiles.forEach(eligibleTile => {
                            if (eligibleTile.isSame(neighbour)) {
                                alreadyCounted = true;
                            }
                        });
                        if (!alreadyCounted) {
                            eligibleTiles.push(neighbour);
                        }
                    }
                }
            })
        });
        const randomIndex = Math.floor(Math.random() * eligibleTiles.length);
        eligibleTiles[randomIndex].clickTile(this.currentPlayer);
    }


    public mouseMove(xy: XYCoordinates) {
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
        if (this._mouseOverTile === null) {
            this._mouseOverTile = closestTile;
        } else {
            if (this._mouseOverTile.centerPoint === closestTile.centerPoint) {
                doDraw = false;
            }
        }
        if (doDraw) {
            this._mouseOverTile = closestTile;
        }
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

        if (closestTile.clickTile(this.currentPlayer)) {
            this.incrementTurn();
        } else {
            //console.log("INVALID CLICK")
        }

    }

    // private _incrementTurn() {
    //     this._configuration.incrementTurn();
    //     console.log("Current turn:  " + this._configuration.currentTurn)
    //     // this._tiles.forEach(tile => tile.incrementTurn());
    //     this._tiles.forEach(tile => {
    //         tile.tileState.growthAccumulation += tile.growValue;
    //         let accumulatedGrowth = tile.growthAccumulation;
    //         if (accumulatedGrowth >= 1) {
    //             let growCount = 0;
    //             let neighbours: HexagonTile[] = [];
    //             tile.neighbours.forEach(n => {
    //                 if (n !== null && n !== undefined) {
    //                     neighbours.push(n);
    //                 }
    //             });
    //             // console.log("Neighbours: ", neighbours)
    //             if (neighbours.length > 0) {
    //                 neighbours = neighbours.filter(n => (n.isNeutral || n.tileOwner === tile.tileOwner));
    //                 if (neighbours.length > 0) {
    //                     for (let i = 0; i < Math.floor(accumulatedGrowth); i++) {
    //                         let randomIndex = Math.floor(Math.random() * neighbours.length);
    //                         // console.log("Random index, Neighbours.length", randomIndex, neighbours.length)
    //                         neighbours[randomIndex].clickTile(tile.tileOwner);
    //                         growCount++;
    //                     }
    //                     accumulatedGrowth = accumulatedGrowth - growCount;
    //                     tile.tileState.growthAccumulation = accumulatedGrowth;
    //                 }
    //             }
    //         }
    //     });
    // }

    private _buildTiles(): void {
        const effectiveRadius = this.tileRadius + this.tileBuffer;
        const halfHeight = Math.sqrt(Math.abs(((this.tileRadius / 2) ** 2) - (this.tileRadius ** 2))) + (this.tileBuffer / 2);
        const effectiveHeight = (halfHeight * 2) + this.tileBuffer;
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
                    tiles.push(new HexagonTile(startX, startY, this.tileRadius, column, row));
                } else {
                    //if it is an odd column
                    let startX = offsetX + (effectiveRadius * 2) + (column * additionalColWidth) - effectiveRadius;
                    let startY = offsetY + effectiveHeight + (effectiveHeight * row);
                    if (columnsHaveSameHeight) {
                        tiles.push(new HexagonTile(startX, startY, this.tileRadius, column, row));
                    } else {
                        if (row != rowCount - 1) {
                            tiles.push(new HexagonTile(startX, startY, this.tileRadius, column, row));
                        }
                    }
                }
            }
        }
        this._tiles = tiles;
        tiles.forEach(setTile => {
            const neighbours: HexagonTile[] = [];
            setTile.neighbourCoords.forEach(nCoord => {
                const foundTile = this.tiles.find(allTile => { return (allTile.hexRow === nCoord.y && allTile.hexCol === nCoord.x) });
                if (foundTile) {
                    neighbours.push(foundTile);
                }
            });
            setTile.setNeighbours(neighbours);
        });
    }

    private _disableTiles() {
        let disableCount: number = Math.floor(this.tiles.length * this.tileDisabledRate);
        while (disableCount > 0) {
            const randomIndex: number = Math.floor(Math.random() * this.tiles.length);
            this.tiles[randomIndex].disable();
            disableCount--;
        }
    }
    private _setPowerTiles() {
        const enabledTiles = this.tiles.filter(tile => !tile.isDisabled);
        let tilePoweredCount: number = this.tilePoweredCount;
        while (tilePoweredCount > 0) {
            const randomIndex: number = Math.floor(Math.random() * enabledTiles.length);
            enabledTiles[randomIndex].setPowerTile();
            tilePoweredCount--;
        }
    }

    /** randomly assign a tile to each player */
    private _setPlayerPositions() {
        const map = new GameBoardMap(this._configuration, this.tiles)
        
        let eligibleTiles = this.tiles.filter(tile => {
            return (tile.isNeutral && !tile.isDisabled && !tile.isPowerTile)
        });
        this.players.forEach(player => {
            let randomIndex = Math.floor(Math.random() * (eligibleTiles.length - 1));
            eligibleTiles[randomIndex].changeOwnership(player);
            eligibleTiles.splice(randomIndex, 1);
        });
    }
}