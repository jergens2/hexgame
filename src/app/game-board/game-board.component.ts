import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameBoard } from './game-board.class';
import { GamePlayer } from './game-player.class';
import { HexagonTile } from './hexagon-tile.class';
import { Square } from './square.class';
import { XYCoordinates } from './xy-coordinates.class';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor() {
  }


  private readonly canvasWidth = 768;
  private readonly canvasHeight = 768;

  public get currentPlayer(): GamePlayer { return this._gameBoard.currentPlayer }

  private _gameBoard: GameBoard = {} as GameBoard;


  @ViewChild('gameboard', { static: true }) private canvas: ElementRef = {} as ElementRef;

  private ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  ngOnInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.ctx = context;
      this._gameBoard = this._buildGameBoard();
      this.drawGameBoard();
    }
  }

  private _buildGameBoard(): GameBoard {
    return new GameBoard(this.canvasWidth, this.canvasHeight);
  }

  public onClickCanvas($event: MouseEvent) {
    const canvasElement = this.canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const clickPoint: XYCoordinates = { x: clickX, y: clickY };
    this._gameBoard.clickBoard(clickPoint);
    this.drawGameBoard();
  }


  public drawGameBoard() {
    this.clearBoard();
    this._gameBoard.tiles.forEach(tile => {

      if (tile.centerPoint === this._gameBoard.mouseOverTile?.centerPoint) {
        this.drawTile(tile, true, true);
      } else {
        this.drawTile(tile, false, true);
      }



    });
  }

  public onMouseMove($event: MouseEvent) {
    const canvasElement = this.canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const mousePoint: XYCoordinates = { x: clickX, y: clickY };
    this._gameBoard.mouseMove(mousePoint);
    this.drawGameBoard();
  }


  public clearBoard(): void {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private drawTile(tile: HexagonTile, doFill: boolean, doStroke: boolean): void {
    this.ctx.fillStyle = tile.getColor();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = tile.getColor();
    this.ctx.beginPath();
    this.ctx.moveTo(tile.point0.x, tile.point0.y);
    this.ctx.lineTo(tile.point1.x, tile.point1.y);
    this.ctx.lineTo(tile.point2.x, tile.point2.y);
    this.ctx.lineTo(tile.point3.x, tile.point3.y);
    this.ctx.lineTo(tile.point4.x, tile.point4.y);
    this.ctx.lineTo(tile.point5.x, tile.point5.y);
    this.ctx.lineTo(tile.point0.x, tile.point0.y);
    if (doFill) {
      this.ctx.fill();
    }
    if (doStroke) {
      this.ctx.stroke();
    }
    // this.ctx.fill();

  }
}
