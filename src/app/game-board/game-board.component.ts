import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  private _tiles: HexagonTile[] = [];


  @ViewChild('gameboard', { static: true }) private canvas: ElementRef = {} as ElementRef;

  private ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  ngOnInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.ctx = context;
      this.buildTiles();
      this.drawHexBoard();
    }

  }

  public onClickCanvas($event: MouseEvent){
    const canvasElement = this.canvas.nativeElement;
    const canvasOriginX = canvasElement.offsetLeft + canvasElement.clientLeft;
    const canvasOriginY = canvasElement.offsetTop + canvasElement.clientTop;
    const clickX = $event.clientX - canvasOriginX;
    const clickY = $event.clientY - canvasOriginY;
    const clickPoint: XYCoordinates = {x: clickX, y: clickY};
    
    let closestTile: HexagonTile = this._tiles[0];
    let smallestDif = this.canvasWidth;
    this._tiles.forEach(tile => {
      let diff = tile.getDistanceTo(clickPoint);
      let totalDiff = diff.x + diff.y;
      if(totalDiff < smallestDif){
        smallestDif = totalDiff;
        closestTile = tile;
      }
    });

    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    closestTile.setColor('rgb('+r+', '+g+', '+b+')')

    this.drawHexBoard();
  }

  public drawHexBoard(){
    this.clearBoard();
    this._tiles.forEach(tile => {
      this.drawTile(tile);
    });
  }


  public buildTiles(): void {
    // this.clearBoard();
    const buffer = 2;
    const radius = 10;
    const effectiveRadius = radius+buffer;
    const halfHeight = Math.sqrt(Math.abs(((radius / 2) ** 2) - (radius ** 2)));
    const effectiveHeight = (halfHeight * 2) + buffer;
    // in the horizontal configuration, the first column is width of 2*radius and each subsequent column adds an additional width of 1.5 * radius
    // every second column will have minus one height, unless there is additional space at the end.
    let columnsHaveSameHeight: boolean = false;
    let currentWidth = 2*effectiveRadius;
    let actualWidth = currentWidth;
    const additionalColWidth = 1.5*effectiveRadius;
    let columnCount = 1;
    while(currentWidth < this.canvasWidth){
      const remainingWidth = this.canvasWidth-currentWidth;
      if(remainingWidth >= additionalColWidth){
        currentWidth += additionalColWidth;
        columnCount ++;
        actualWidth = currentWidth;
      }else{
        currentWidth = this.canvasWidth+1;
      }
    }
    let rowCount = Math.floor(this.canvasHeight/effectiveHeight);
    let actualHeight = rowCount * effectiveHeight;
    if((this.canvasHeight - (rowCount * effectiveHeight)) > halfHeight){
      columnsHaveSameHeight = true;
      actualHeight += (effectiveHeight/2);
    }
    const offsetX = (this.canvasWidth - actualWidth) / 2;
    const offsetY = (this.canvasHeight - actualHeight) / 2;
    const tiles: HexagonTile[] = [];
    for(let column = 0; column < columnCount; column++){
      for(let row=0; row< rowCount; row++){
          if(column%2 ==0){
            //if it is an even column
            let startX = offsetX + effectiveRadius + (column * additionalColWidth);
            let startY = offsetY + effectiveHeight / 2 + (effectiveHeight*row); 
            tiles.push(new HexagonTile(startX, startY, radius, row, column));
          }else{
            //if it is an odd column
            let startX = offsetX + (effectiveRadius*2) + (column * additionalColWidth) - effectiveRadius;
            let startY = offsetY + effectiveHeight + (effectiveHeight * row);
            if(columnsHaveSameHeight){
              tiles.push(new HexagonTile(startX, startY, radius, row, column));
            }else{
              if(row != rowCount-1){
                tiles.push(new HexagonTile(startX, startY, radius, row, column));
              }
            }
          }
      }
    }
    this._tiles = tiles;
  }


  public clearBoard(): void {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private drawTile(tile: HexagonTile): void{
    this.ctx.fillStyle = tile.getColor();
    this.ctx.beginPath();
    this.ctx.moveTo(tile.point0.x, tile.point0.y);
    this.ctx.lineTo(tile.point1.x, tile.point1.y);
    this.ctx.lineTo(tile.point2.x, tile.point2.y);
    this.ctx.lineTo(tile.point3.x, tile.point3.y);
    this.ctx.lineTo(tile.point4.x, tile.point4.y);
    this.ctx.lineTo(tile.point5.x, tile.point5.y);
    this.ctx.fill();
  }
}
