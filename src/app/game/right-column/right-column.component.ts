import { Component, OnInit } from '@angular/core';
import { GameBoard } from '../game-board/game-board.class';
import { Tile } from '../game-board/tiles/tile.class';
import { Unit } from '../game-board/units/unit.class';
import { Game } from '../game.class';
import { GameService } from '../game.service';
import { Player } from '../player/player.class';

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.scss']
})
export class RightColumnComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  private _tileOwnership: string = '';
  private _unitCount: string = '';
  private _passButtonEnabled: boolean = true;

  public get game(): Game { return this._gameService.game; }
  public get gameBoard(): GameBoard { return this.game.board; }
  public get players(): Player[] { return this.game.players; }
  public get currentPlayer(): Player { return this.game.currentPlayer; }
  public get currentTurn(): number { return this.game.currentTurn; }
  public get selectedTile(): Tile | null { return this.game.selectedTile; }

  public get tileOwnership(): string { return this._tileOwnership; }
  public get unitCount(): string { return this._unitCount; }
  public get passButtonEnabled(): boolean { return this._passButtonEnabled; }

  public onClickEndTurnButton() { this.game.onClickEndTurn(); }

  ngOnInit(): void {
    this._gameService.game.board.selectedTile$.subscribe(tile => { this._updateDisplay() });
  }

  public onUnitClicked(unit: Unit | null){
  }

  private _updateDisplay() {
    let tileOwnership: string = '';
    let unitCountStr: string = '';
    if (this.selectedTile !== null) {
      if(this.selectedTile.isOwned){
        tileOwnership = this.selectedTile.owner.name + '\'s tile';
      }
      const unitCount = this.selectedTile.unitController.unitCount;
      if (unitCount === 1) {
        unitCountStr = '1 unit';
      } else {
        unitCountStr = '' + unitCount + ' units';
      }
    }
    this._tileOwnership = tileOwnership;
    this._unitCount = unitCountStr;
  }



}
