import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GameService } from 'src/app/game/game.service';
import { Unit } from '../unit.class';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  private _unit: Unit | null = null;
  private _unitClicked$: Subject<any> = new Subject();
  private _ngClass: string[] = [];
  @Input() public set unit(unit: Unit | null) { this._unit = unit; }
  public get unit(): Unit | null { return this._unit; }
  public get ngClass(): string[] { return this._ngClass; }

  public get isSoldier(): boolean { if (this.unit) { return this.unit.isSoldier } else { return false }; }
  public get isLeader(): boolean { if (this.unit) { return this.unit.isLeader } else { return false }; }
  public get isBuilder(): boolean { if (this.unit) { return this.unit.isBuilder } else { return false }; }

  @Output() public get unitClicked$(): Observable<Unit | null> { return this._unitClicked$.asObservable(); }

  ngOnInit(): void {
    this._evaluateStyles();
    this._gameService.game.board.selectedTile$.subscribe(player => this._evaluateStyles());
    this._gameService.currentPlayer$.subscribe(player => this._evaluateStyles());
    this._gameService.updateTileUnits.subscribe(turn => this._evaluateStyles());
  }

  private _evaluateStyles() {
    const classes: string[] = [];
    if (this.unit) {
      const isOwner: boolean = this._gameService.currentPlayer === this.unit.ownedBy
      if (this.unit.isSelected && isOwner) {
        classes.push('is-selected');
      }
      if (this.unit.cannotFight) {
        classes.push('cannot-fight');
      }
    }
    this._ngClass = classes;
  }

  public onClick() {
    if (this.unit) {
      if (this.unit.ownedBy === this._gameService.currentPlayer) {
        this.unit.toggleSelection();
        this._evaluateStyles();
        // this._unitClicked$.next(this.unit);
      }
    }
  }

}
