import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GameBoard } from './game-board.class';
import { GamePlayer } from '../game-player/game-player.class';
import { TileHexagon } from './tiles/tile-hexagon';
import { XYCoordinates } from './tiles/xy-coordinates.class';
import { Game } from '../game.class';
import { GameService } from '../game.service';
import { Tile } from './tiles/tile.class';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private _gameService: GameService) { }


  private _canvasContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  @ViewChild('gameboard', { static: true }) private _canvas: ElementRef = {} as ElementRef;

  public get game(): Game { return this._gameService.game; }
  public get board(): GameBoard { return this.game.board; }
  public get players(): GamePlayer[] { return this.game.players; }
  public get currentPlayer(): GamePlayer { return this.game.currentPlayer }
  public get canvasWidth(): number { return this.game.configuration.canvasWidth; }
  public get canvasHeight(): number { return this.game.configuration.canvasHeight; }
  public get passButtonEnabled(): boolean { return !this.game.currentPlayer.isBot; }
  ngOnInit(): void {
    const context = this._canvas.nativeElement.getContext('2d');
    if (context) {
      this._canvasContext = context;
      this._drawGameBoard();
      // const sub = this._board.currentTurn$.subscribe((tick) => {
      //   this.drawGameBoard();
      // }) 
    }
  }

  public onClickCanvas($event: MouseEvent) {
    const canvasElement = this._canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const clickPoint: XYCoordinates = { x: clickX, y: clickY };
    this.board.clickBoard(clickPoint);
    this._drawGameBoard();
  }


  /**
   * Every time drawGameBoard() is called, we clear the image and redraw each tile.
   */
  private _drawGameBoard() {
    this._clearBoard();
    this.board.tiles.forEach(tile => {
      this._drawHexagon(tile, true, false);
      // if (tile.centerPoint === this._gameBoard.mouseOverTile?.centerPoint) {
      //   this.drawTile(tile, true, true);
      // } else {
      //   this.drawTile(tile, false, true);
      // }
    });
  }

  public onMouseMove($event: MouseEvent) {
    // const canvasElement = this.canvas.nativeElement;
    // const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    // const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    // const clickX = $event.clientX - canvasOriginX;
    // const clickY = $event.clientY - canvasOriginY;
    // const mousePoint: XYCoordinates = { x: clickX, y: clickY };
    // this._gameBoard.mouseMove(mousePoint);
    // this.drawGameBoard();
  }

  private _clearBoard(): void {
    this._canvasContext.save();
    this._canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private _drawHexagon(tile: Tile, doFill: boolean, doStroke: boolean): void {
    const hexagon: TileHexagon = tile.hexagon;
    if (!tile.isDisabled) {
      this._canvasContext.beginPath();
      this._canvasContext.moveTo(hexagon.point0.x, hexagon.point0.y);
      this._canvasContext.lineTo(hexagon.point1.x, hexagon.point1.y);
      this._canvasContext.lineTo(hexagon.point2.x, hexagon.point2.y);
      this._canvasContext.lineTo(hexagon.point3.x, hexagon.point3.y);
      this._canvasContext.lineTo(hexagon.point4.x, hexagon.point4.y);
      this._canvasContext.lineTo(hexagon.point5.x, hexagon.point5.y);
      this._canvasContext.lineTo(hexagon.point0.x, hexagon.point0.y);
      if (tile.isPowerTile) {
        this._canvasContext.fillStyle = 'gray';
        this._canvasContext.strokeStyle = "gray";

        this._canvasContext.stroke();
      } else {
        this._canvasContext.fillStyle = hexagon.fillColor;
      }
      this._canvasContext.lineWidth = hexagon.strokeWidth;
      this._canvasContext.fill();
      doStroke = true;
      if (doStroke) {
        if (tile.isOwned) {
          this._canvasContext.strokeStyle = tile.tileOwner.colorSwatch[4];
          // this._canvasContext.lineWidth = 1;
          // if (tile.powerLevel >= 5) {
          //   this._canvasContext.lineWidth = 2;
          // }
          this._canvasContext.stroke();
        } else {
          this._canvasContext.strokeStyle = 'rgb(210,210,210)';
          // this._canvasContext.lineWidth = 1;
          this._canvasContext.stroke();
        }
      }
      this._canvasContext.fillStyle = 'black';
      // if (tile.powerLevel >= 5) {
      //   this._canvasContext.fillStyle = 'rgb(130,130,130)';
      // }
      // if (tile.powerLevel >= 7) {
      //   this._canvasContext.fillStyle = 'rgb(250,250,250)';
      // }
      this._canvasContext.font = "8px Arial";
      this._canvasContext.textAlign = 'center';
      this._canvasContext.textBaseline = 'middle';
      let energyValue = Math.floor(tile.tileState.energyValue);
      let energyStr: string = '';
      // if(energyValue > 1){
      energyStr = String(energyValue);
      // }
      let x = hexagon.centerPoint.x;
      let y = hexagon.centerPoint.y;
      this._canvasContext.fillText(energyStr, x, y);
    } else if (tile.isDisabled) {

    }

  }
}
