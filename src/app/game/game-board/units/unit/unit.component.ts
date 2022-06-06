import { Component, Input, OnInit } from '@angular/core';
import { Unit } from '../unit.class';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  constructor() { }

  private _unit: Unit | null = null;
  @Input() public set unit(unit: Unit | null) { this._unit = unit; }
  public get unit(): Unit | null { return this._unit; }

  public get isSoldier(): boolean { if (this.unit) { return this.unit.isSoldier } else { return false }; }
  public get isLeader(): boolean { if (this.unit) { return this.unit.isLeader } else { return false }; }

  ngOnInit(): void {
  }

}
