import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Unit } from '../unit.class';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  constructor() { }

  private _unit: Unit | null = null;
  private _unitClicked$: Subject<any> = new Subject();
  private _ngClass: string[] = [];
  @Input() public set unit(unit: Unit | null) { this._unit = unit; }
  public get unit(): Unit | null { return this._unit; }
  public get ngClass(): string[] { return this._ngClass; }

  public get isSoldier(): boolean { if (this.unit) { return this.unit.isSoldier } else { return false }; }
  public get isLeader(): boolean { if (this.unit) { return this.unit.isLeader } else { return false }; }

  @Output() public get unitClicked$(): Observable<Unit | null> { return this._unitClicked$.asObservable(); }

  ngOnInit(): void {
    this._evaluateStyles();
  }

  private _evaluateStyles(){
    if(this.unit){
      if(this.unit.isSelected){
        this._ngClass = ['is-selected'];
      }else{
        this._ngClass = [];
      }
    }
  }

  public onClick(){
    this.unit?.toggleSelection();
    this._evaluateStyles();
    this._unitClicked$.next(this.unit);
  }

}
