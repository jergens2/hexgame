import { Player } from "../../player/player.class";
import { Unit } from "../units/unit.class";
import { TileHexagon } from "./tile-hexagon";
import { TileProductionMode } from "./tile-production-mode.enum";
import { TileState } from "./tile-state.class";
import { TileActionController } from "./tile-action-controller.class";
import { LeaderUnit } from "../units/leader-unit.class";
import { TileAppearanceController } from "./tile-appearance-controller.class";
import { TileAppearance } from "./tile-appearance.interface";
import { TileProductionController } from "./tile-production-controller.class";
import { TileUnitController } from "./tile-unit-controller.class";
import { SoldierUnit } from "../units/soldier-unit.class";

export class Tile{ 
    
    private _productionMode: TileProductionMode = TileProductionMode.BUILD_UNITS;
    private _hexagon: TileHexagon;
    private _tileState: TileState;
    private _unitController: TileUnitController = new TileUnitController();

    public get tileState(): TileState { return this._tileState; }
    public get owner(): Player { return this.tileState.ownedBy; }
    public get isOwned(): boolean { return !this.tileState.isNeutral; }
    public get isNeutral(): boolean { return this.tileState.isNeutral; }
    public get isDisabled(): boolean { return this.tileState.isDisabled; }
    public get isPowerTile(): boolean { return this.tileState.isPowerSource; }
    public get isSelected(): boolean { return this.tileState.isSelected; }
    public get productionRate(): number { return this.tileState.productionRate; }
    public get accumulatedProduction(): number { return this.tileState.accumulatedProduction; }

    public get unitController(): TileUnitController { return this._unitController; }

    public get productionMode(): TileProductionMode { return this._productionMode; }
    public get hexagon(): TileHexagon { return this._hexagon; }
    public get appearance(): TileAppearance { return TileAppearanceController.getAppearance(this); }

    public isSame(tile: TileHexagon): boolean { return this.hexagon.isSame(tile); }

    public addUnit(unit: Unit): void { return this._unitController.addUnit(unit); }
    public placeLeader(leader: LeaderUnit): void { return this._unitController.placeLeader(leader); }
    public eliminateAllUnits(): void { return this._unitController.eliminateAllUnits(); }
    public eliminateAllSoldiers(): void { return this._unitController.eliminateAllSoldiers(); }
    public eliminateSoldiers(count: number): void { return this._unitController.eliminateSoldiers(count); }
    public transferOutSoldiers(count: number): SoldierUnit[] { return this._unitController.transferOutSoldiers(count); }
    public transferInSoldiers(soldiers: SoldierUnit[]): void { return this._unitController.transferInSoldiers(soldiers); }
    public setUnitsReady(): void { this._unitController.setUnitsReady(); }

    public selectTile(): void { TileActionController.selectTile(this.tileState); }
    public deselectTile(): void { TileActionController.deselectTile(this.tileState); }
    public clickTile(player: Player): void { TileActionController.clickTile(player, this.tileState.ownedBy); }
    // public grow(): void { TileActionController.grow(this.tileState); }

    public changeOwnership(player: Player): void { TileActionController.changeOwnership(this, player); }
    public disable(): void { TileActionController.disable(this.tileState); }
    public setPowerTile(): void { TileActionController.setPowerTile(this.tileState); }
    
    public evaluateProduction(): void{ TileProductionController.evaluateProduction(this); }

    
    constructor(hexagon: TileHexagon){
        this._hexagon = hexagon;
        this._tileState = {
            isNeutral: true,
            isDisabled: false,
            isPowerSource: false,
            ownedBy: new Player('', '', '', true),
            isSelected: false,
            productionRate: 0,
            accumulatedProduction: 0,
            productionMode: TileProductionMode.BUILD_UNITS,
        };
    }
}
