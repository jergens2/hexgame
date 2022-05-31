import { Observable, Subject, Subscription, timer } from "rxjs";
import { GameBoardMap } from "./game-board-map.class";
import { GameConfiguration } from "./game-configuration.class";
import { GamePlayerBot } from "../game-player/game-player-bot.class";
import { GamePlayerBuilder } from "../game-player/game-player-builder.class";
import { GamePlayer } from "../game-player/game-player.class";
import { GameTurnProcessor } from "./game-turn-processor.class";
import { HexagonTile } from "./hexagon-tile.class";
import { XYCoordinates } from "./xy-coordinates.class";
import { GameLogService } from "../game-log/game-log.service";

export class GameBoard {
    private _tiles: HexagonTile[] = [];
    private _configuration: GameConfiguration;
    private _mouseOverTile: HexagonTile | null = null;


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

    public get currentTurn$(): Observable<number> { return this._configuration.currentTurn$; }

    public get mouseOverTile(): HexagonTile | null { return this._mouseOverTile; }

    private _botTurnSubscription: Subscription = new Subscription();
    private _logService: GameLogService;

    constructor(logService: GameLogService) {
        this._logService = logService;
        this._configuration = this._configureGame();
        this._buildTiles();
        this._disableTiles();
        this._setPowerTiles();
        this._setPlayerPositions();

    }
    private _configureGame(): GameConfiguration {
        const playerBuilder = new GamePlayerBuilder();
        const players = playerBuilder.buildPlayers(1, 5);
        // const players = playerBuilder.buildPlayers(0, 6);
        const canvasWidth: number = 768;
        const canvasHeight: number = 768;
        const tileRadius: number = 10;
        const tileBuffer: number = 2;
        const tileDisabledRate: number = 0.05;
        const tilePoweredCount: number = 12;
        return new GameConfiguration(players, canvasWidth, canvasHeight, tileRadius, tileBuffer, tileDisabledRate, tilePoweredCount);
    }


    public startGame() {

        this._configuration.currentPlayer$.subscribe(player => {
            
            if (player.isBot) {
                this._takeBotTurn();
            }
        });
        this.currentTurn$.subscribe(turn => {
            this._logService.addToLog("The turn was incremented! initiating GROWTH", this._configuration);
            this._tiles.forEach(tile => tile.grow());
        });

        // if (this.currentPlayer.isBot) {
        //     this._takeBotTurn();
        // }
    }

    private _takeBotTurn() {
        if (this.currentPlayer.isBot) {
            const currentBotPlayer = this.currentPlayer as GamePlayerBot;
            const botTurnTimeMs = 100;
            timer(botTurnTimeMs).subscribe(() => {
                currentBotPlayer.takeBotTurn(this.tiles);
                this._logService.addToLog("Incrementing player", this._configuration);
                this._configuration.incrementPlayer();
            });
        }
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




    private _turnProcessor: GameTurnProcessor = new GameTurnProcessor();
    private _validatingCurrentAction: boolean = false;
    /**
     * 
     * The board is clicked by the current non-bot player
     * 
     */
    public clickBoard(xy: XYCoordinates) {
        if (!this.currentPlayer.isBot) {
            if (this._validatingCurrentAction === false) {
                this._validatingCurrentAction = true;
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
                let selectedTile: HexagonTile | undefined = this.tiles.find(tile => tile.isSelected);
                const turnProcessor = new GameTurnProcessor();
                const endOfTurn: boolean = turnProcessor.processClick(this.currentPlayer, closestTile, selectedTile, this.tiles);
                if (endOfTurn) {
                    this._tiles.forEach(tile => tile.deselectTile());
                    this._validatingCurrentAction = false;
                    this._logService.addToLog("Incrementing player", this._configuration);
                    this._configuration.incrementPlayer();
                }
                this._validatingCurrentAction = false;
            } else {
                console.log("Can't click right now, try again");
            }
        } else {
            console.log("Can't click during bot's turn")
        }
    }

    public onClickPass(){
        this._tiles.forEach(tile => tile.deselectTile());
        this._logService.addToLog("Player PASSED", this._configuration);
        this._configuration.incrementPlayer();
    }


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


    /**
     * 
     * ZANY MODE:
     * occupy every neutral spot randomly and evenly for each player, sort of like how the board game Risk starts
     * 
     */
    private _setPlayerPositions() {


        let eligibleTiles = this.tiles.filter(tile => {
            return (tile.isNeutral && !tile.isDisabled && !tile.isPowerTile)
        });

        let playerIndex = 0;
        while (eligibleTiles.length > 0) {
            let randomIndex = Math.floor(Math.random() * (eligibleTiles.length - 1));
            eligibleTiles[randomIndex].changeOwnership(this.players[playerIndex]);
            eligibleTiles.splice(randomIndex, 1);
            playerIndex++;
            if (playerIndex == this.playerCount) {
                playerIndex = 0;
            }
            // eligibleTiles = this.tiles.filter(tile => {
            //     return (tile.isNeutral && !tile.isDisabled && !tile.isPowerTile)
            // });
        }
    }

}