import { GamePlayer } from "../../game-player/game-player.class";
import { Unit } from "../units/unit.class";
import { TileHexagon } from "./tile-hexagon";
import { TileProductionMode } from "./tile-production-mode.enum";
import { TileState } from "./tile-state.class";
import { TileActionController } from "./tile-action-controller.class";
import { LeaderUnit } from "../units/leader-unit.class";
import { TileAppearanceController } from "./tile-appearance-controller.class";
import { TileAppearance } from "./tile-appearance.interface";

export class Tile{ 

    private _units: Unit[] = [];
    // private _modifiers: TileModifier [] = [];
    private _productionMode: TileProductionMode = TileProductionMode.BUILD_UNITS;
    private _hexagon: TileHexagon;
    private _tileState: TileState;

    public get tileState(): TileState { return this._tileState; }
    public get owner(): GamePlayer { return this.tileState.ownedBy; }
    public get isOwned(): boolean { return !this.tileState.isNeutral; }
    public get isNeutral(): boolean { return this.tileState.isNeutral; }
    public get isDisabled(): boolean { return this.tileState.isDisabled; }
    public get isPowerTile(): boolean { return this.tileState.isPowerSource; }
    public get isSelected(): boolean { return this.tileState.isSelected; }
    public isSame(tile: TileHexagon): boolean { return this.hexagon.isSame(tile); }

    public get units(): Unit[] { return this._units; }
    public get productionMode(): TileProductionMode { return this._productionMode; }
    public get hexagon(): TileHexagon { return this._hexagon; }
    public get appearance(): TileAppearance { return TileAppearanceController.getAppearance(this); }


    public placeLeader(leader: LeaderUnit): void { TileActionController.placeLeader(leader, this.units, this.tileState); }
    public selectTile(): void { TileActionController.selectTile(this.tileState); }
    public deselectTile(): void { TileActionController.deselectTile(this.tileState); }
    public clickTile(player: GamePlayer): void { TileActionController.clickTile(player, this.tileState.ownedBy); }
    public grow(): void { TileActionController.grow(this.tileState); }
    public addUnit(unit: Unit): void { TileActionController.addUnit(unit, this.units); }
    public changeOwnership(player: GamePlayer): void { TileActionController.changeOwnership(player, this.tileState); }
    public takeNeutralTile(attacker: GamePlayer, attackingTile: Tile): void { TileActionController.takeNeutralTile(attacker, attackingTile, this.tileState); }
    public attackOwnedTile(attacker: GamePlayer, attackingTile: Tile): void { TileActionController.attackOwnedTile(attacker, attackingTile, this.tileState); }
    public spreadtoOwnedTile(attacker: GamePlayer, attackingTile: Tile): void { TileActionController.spreadtoOwnedTile(attacker, attackingTile, this.tileState); }
    public disable(): void { TileActionController.disable(this.tileState); }
    public setPowerTile(): void { TileActionController.setPowerTile(this.tileState); }
    


    constructor(hexagon: TileHexagon){
        this._hexagon = hexagon;
        this._tileState = {
            isNeutral: true,
            isDisabled: false,
            isPowerSource: false,
            ownedBy: new GamePlayer('', '', '', true),
            energyValue: 0,
            energyGrowValue: 0.01,
            isSelected: false,
            // powerValue: 0,
            // powerLevel: 0,
            // growthAccumulation: 0,
        };
    }




}