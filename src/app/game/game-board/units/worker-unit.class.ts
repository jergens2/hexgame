import { Player } from "../../player/player.class";
import { UnitType } from "./unit-type.enum";
import { Unit } from "./unit.class";

export class WorkerUnit extends Unit{

    public readonly unitType: UnitType = UnitType.BUILDER;

    public restoreTravelDistance(): void { this._travelDistanceRemaining = 1; }
    public restoreFightingStrength(): void { this._fightingStrengthRemaining = 1; }


    constructor(owner: Player){
        super(owner);
    }
}