import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { GameBoard } from './game-board.class';
import { Player } from '../player/player.class';
import { TileHexagon } from './tiles/tile-hexagon';
import { XYCoordinates } from './tiles/xy-coordinates.class';
import { Game } from '../game.class';
import { GameService } from '../game.service';
import { Tile } from './tiles/tile.class';
import { TileAppearance } from './tiles/tile-appearance.interface';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private _gameService: GameService) { }


  private _canvasContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  @ViewChild('gameboard', { static: true }) private _canvas: ElementRef = {} as ElementRef;

  @HostListener('contextmenu', ['$event']) onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  public get game(): Game { return this._gameService.game; }
  public get board(): GameBoard { return this.game.board; }
  public get players(): Player[] { return this.game.players; }
  public get currentPlayer(): Player { return this.game.currentPlayer }
  public get canvasWidth(): number { return this.game.configuration.canvasWidth; }
  public get canvasHeight(): number { return this.game.configuration.canvasHeight; }
  public get passButtonEnabled(): boolean { return !this.game.currentPlayer.isBot; }

  ngOnInit(): void {
    const context = this._canvas.nativeElement.getContext('2d');
    if (context) {
      this._canvasContext = context;
      this._drawGameBoard();
      const sub = this.game.currentTurn$.subscribe((tick) => {
        this._drawGameBoard();
      });
    }
  }

  public onClickCanvas($event: MouseEvent) {
    const isLeftClick: boolean = $event.button === 0;
    const isMiddleClick: boolean = $event.button === 1;
    const isRightClick: boolean = $event.button === 2;
    const canvasElement = this._canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const clickPoint: XYCoordinates = { x: clickX, y: clickY };
    if (isLeftClick) {
      this.board.leftClickBoard(clickPoint, this.currentPlayer);
    } else if (isRightClick) {
      this.board.rightClickBoard(clickPoint, this.currentPlayer);
    }
    this._drawGameBoard();
  }


  /**
   * Every time drawGameBoard() is called, we clear the image and redraw each tile
   */
  private _drawGameBoard() {
    this._clearBoard();
    this.board.tiles.forEach(tile => this._drawHexagon(tile));
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

  private _drawHexagon(tile: Tile): void {
    const hexagon: TileHexagon = tile.hexagon;
    const appearance: TileAppearance = tile.appearance;
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(hexagon.point0.x, hexagon.point0.y);
    this._canvasContext.lineTo(hexagon.point1.x, hexagon.point1.y);
    this._canvasContext.lineTo(hexagon.point2.x, hexagon.point2.y);
    this._canvasContext.lineTo(hexagon.point3.x, hexagon.point3.y);
    this._canvasContext.lineTo(hexagon.point4.x, hexagon.point4.y);
    this._canvasContext.lineTo(hexagon.point5.x, hexagon.point5.y);
    this._canvasContext.lineTo(hexagon.point0.x, hexagon.point0.y);
    this._canvasContext.fillStyle = appearance.fillStyle;
    this._canvasContext.font = appearance.font;
    this._canvasContext.textAlign = appearance.textAlign;
    this._canvasContext.textBaseline = appearance.textBaseline;
    this._canvasContext.strokeStyle = appearance.strokeStyle;
    this._canvasContext.lineWidth = appearance.lineWidth;
    this._canvasContext.stroke();
    this._canvasContext.fill();
    if(appearance.text !== ''){
      const x = tile.hexagon.centerPoint.x;
      const y = tile.hexagon.centerPoint.y;
      this._canvasContext.fillStyle = 'black';
      this._canvasContext.fillText(appearance.text, x, y);
    }
    
  }
}
