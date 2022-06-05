import { Player } from "../../player/player.class";
import { UnitType } from "./unit-type.enum";

/** Game player units, e.g. attacking units, building units, defending units */
export abstract class Unit{

    private _ownedBy: Player;
    protected _travelDistanceRemaining: number = 1;
    protected _fightingStrengthRemaining: number = 1;

    public get ownedBy(): Player { return this._ownedBy; }
    public get travelDistanceRemaining(): number { return this._travelDistanceRemaining; }
    public get fightingStrengthRemaining(): number { return this._fightingStrengthRemaining; }
    
    public get canFight(): boolean { return !this.cannotFight; }
    public get cannotFight(): boolean { return this._isFightingExhausted(); }
    public get cannotTravel(): boolean { return this._isTravelExhausted(); }
    public get canTravel(): boolean { return !this.cannotTravel; }

    public get isLeader(): boolean { return this.unitType === UnitType.LEADER; }
    public get isSoldier(): boolean { return this.unitType === UnitType.SOLDIER; }

    public abstract get unitType(): UnitType;
    public abstract restoreTravelDistance(): void;
    public abstract restoreFightingStrength(): void;

    public travel(distance: number = 1): void { this._travelDistanceRemaining -= distance; }

    private _isTravelExhausted(): boolean { return this._travelDistanceRemaining < 1; }
    private _isFightingExhausted(): boolean { return this._fightingStrengthRemaining < 1; }

    constructor(ownedBy: Player){
        this._ownedBy = ownedBy;
    }
}