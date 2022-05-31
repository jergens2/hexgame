import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameBoard } from './game-board.class';
import { GamePlayer } from '../game-player/game-player.class';
import { HexagonTile } from './hexagon-tile.class';
import { Square } from './square.class';
import { XYCoordinates } from './xy-coordinates.class';
import * as DateTime from 'luxon';
import { GameConfiguration } from './game-configuration.class';
import { GameLogService } from '../game-log/game-log.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(logService: GameLogService) {
    this._logService = logService;
  }
  private _logService: GameLogService;
  private _gameBoard: GameBoard = {} as GameBoard;
  private _currentPlayerNgStyle: any = {};
  private _canvasContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  @ViewChild('gameboard', { static: true }) private canvas: ElementRef = {} as ElementRef;
  public get currentPlayer(): GamePlayer { return this._gameBoard.currentPlayer }
  public get players(): GamePlayer[] { return this._gameBoard.players; }
  public get currentPlayerNgStyle(): any { return this._currentPlayerNgStyle; }
  public get canvasWidth(): number { return this._gameBoard.canvasWidth }
  public get canvasHeight(): number { return this._gameBoard.canvasHeight }
  public get passButtonEnabled(): boolean { return !this._gameBoard.currentPlayer.isBot; }

  ngOnInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this._canvasContext = context;
      this._gameBoard = this._buildGameBoard();
      this.drawGameBoard();
      this._gameBoard.startGame();
      const sub = this._gameBoard.currentTurn$.subscribe((tick)=>{
        this.drawGameBoard();
      })
    }
  }

  /** Set configurations here */
  private _buildGameBoard(): GameBoard {
    return new GameBoard(this._logService);
  }

  public onClickCanvas($event: MouseEvent) {
    const canvasElement = this.canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const clickPoint: XYCoordinates = { x: clickX, y: clickY };

    const start = DateTime.DateTime.now();
    this._gameBoard.clickBoard(clickPoint);
    this.drawGameBoard();
    const end = DateTime.DateTime.now();
    const ms = end.diff(start, 'milliseconds');
  }


  public onClickPass(){
    this._gameBoard.onClickPass();
  }

  /**
   * Every time drawGameBoard() is called, we clear the image and redraw each tile.
   */
  public drawGameBoard() {
    this.clearBoard();
    this._currentPlayerNgStyle = {
      'background-color': this.currentPlayer.baseColor,
    }
    this._gameBoard.tiles.forEach(tile => {
      this.drawTile(tile, true, false);
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

  public clearBoard(): void {
    this._canvasContext.save();
    this._canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private drawTile(tile: HexagonTile, doFill: boolean, doStroke: boolean): void {
    if (!tile.isDisabled) {
      this._canvasContext.beginPath();
      this._canvasContext.moveTo(tile.point0.x, tile.point0.y);
      this._canvasContext.lineTo(tile.point1.x, tile.point1.y);
      this._canvasContext.lineTo(tile.point2.x, tile.point2.y);
      this._canvasContext.lineTo(tile.point3.x, tile.point3.y);
      this._canvasContext.lineTo(tile.point4.x, tile.point4.y);
      this._canvasContext.lineTo(tile.point5.x, tile.point5.y);
      this._canvasContext.lineTo(tile.point0.x, tile.point0.y);
      if(tile.isPowerTile){
        this._canvasContext.fillStyle = 'gray';
        this._canvasContext.strokeStyle = "gray";
        
        this._canvasContext.stroke();
      }else{
        this._canvasContext.fillStyle = tile.fillColor;
      }
      this._canvasContext.lineWidth = tile.strokeWidth;
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
      let x = tile.centerPoint.x;
      let y = tile.centerPoint.y;
      this._canvasContext.fillText(energyStr, x, y);
    }else if(tile.isDisabled){

    }

  }
}
