import { Component, OnInit } from '@angular/core';
import { GameBoard } from '../game-board/game-board.class';
import { TileProductionMode } from '../game-board/tiles/tile-production-mode.enum';
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

  public get isProducingSoldiers(): boolean { return this.selectedTile?.productionMode === TileProductionMode.PRODUCE_SOLDIERS; }
  public get isProducingBuilders(): boolean { return this.selectedTile?.productionMode === TileProductionMode.PRODUCE_BUILDERS }
  public get isProducingGrowth(): boolean { return this.selectedTile?.productionMode === TileProductionMode.PRODUCE_GROWTH; }
  public get isProducingIntelligence(): boolean { return this.selectedTile?.productionMode === TileProductionMode.PRODUCE_INTELLIGENCE; }


  public onClickEndTurnButton() { this.game.onClickEndTurn(); }

  ngOnInit(): void {
    this._gameService.game.board.selectedTile$.subscribe(tile => this._updateDisplay());
    this._gameService.currentPlayer$.subscribe(player => this._updateDisplay());
  }

  public onUnitClicked(unit: Unit | null) {
  }

  public onClickProductionMode(mode: string){
    let productionMode: TileProductionMode = TileProductionMode.PRODUCE_SOLDIERS
    if(mode === TileProductionMode.PRODUCE_BUILDERS){
      productionMode = TileProductionMode.PRODUCE_BUILDERS;
    }else if(mode === TileProductionMode.PRODUCE_SOLDIERS){
      productionMode = TileProductionMode.PRODUCE_SOLDIERS;
    }else if(mode === TileProductionMode.PRODUCE_GROWTH){
      productionMode = TileProductionMode.PRODUCE_GROWTH;
    }else if(mode === TileProductionMode.PRODUCE_INTELLIGENCE){
      productionMode = TileProductionMode.PRODUCE_INTELLIGENCE;
    }
    this.selectedTile?.changeProductionMode(productionMode);
  }

  private _updateDisplay() {
    let tileOwnership: string = '';
    let unitCountStr: string = '';
    if (this.selectedTile !== null) {
      if (this.selectedTile.isOwned) {
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
