import { Player } from "../../player/player.class";
import { UnitType } from "./unit-type.enum";

/** Game player units, e.g. attacking units, building units, defending units */
export abstract class Unit{

    private _ownedBy: Player;
    private _isSelected: boolean = false;
    protected _travelDistanceRemaining: number = 1;
    protected _fightingStrengthRemaining: number = 1;

    public get ownedBy(): Player { return this._ownedBy; }
    public get isSelected(): boolean { return this._isSelected; }
    public get travelDistanceRemaining(): number { return this._travelDistanceRemaining; }
    public get fightingStrengthRemaining(): number { return this._fightingStrengthRemaining; }
    
    public get canFight(): boolean { return !this.cannotFight; }
    public get cannotFight(): boolean { return this._isFightingExhausted(); }
    public get cannotTravel(): boolean { return this._isTravelExhausted(); }
    public get canTravel(): boolean { return !this.cannotTravel; }

    public get isLeader(): boolean { return this.unitType === UnitType.LEADER; }
    public get isSoldier(): boolean { return this.unitType === UnitType.SOLDIER; }

    public get isAttackingSoldier(): boolean { 
        if(this.isSoldier){
            if(this.canFight && this.canTravel && this.isSelected){
                return true;
            }
        }
        return false;
    }
    public get isMovingSoldier(): boolean { 
        if(this.isSoldier){
            if(this.canTravel && this.isSelected){
                return true;
            }
        }
        return false;
    }

    public abstract get unitType(): UnitType;
    public restoreAll(): void { this.restoreFightingStrength(); this.restoreTravelDistance(); }
    public exhaustAll(): void { this.diminishFightingStrength(); this.diminishMovementStrenght(); }
    public abstract restoreTravelDistance(): void;
    public abstract restoreFightingStrength(): void;

    public travel(distance: number = 1): void { this._travelDistanceRemaining -= distance; }
    public selectUnit(): void { this._isSelected = true; }
    public deselectUnit(): void { this._isSelected = false; }
    public toggleSelection(): void { this._isSelected = !this._isSelected; }

    public diminishFightingStrength(): void { this._fightingStrengthRemaining = 0; }
    public diminishMovementStrenght(): void { this._travelDistanceRemaining = 0; }

    private _isTravelExhausted(): boolean { return this._travelDistanceRemaining < 1; }
    private _isFightingExhausted(): boolean { return this._fightingStrengthRemaining < 1; }


    constructor(ownedBy: Player){
        this._ownedBy = ownedBy;
    }
}