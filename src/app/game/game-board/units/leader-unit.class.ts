import { Player } from "../../player/player.class";
import { UnitType } from "./unit-type.enum";
import { Unit } from "./unit.class";

export class LeaderUnit extends Unit {

    public readonly unitType: UnitType = UnitType.LEADER;

    public restoreTravelDistance(): void { this._travelDistanceRemaining = 1; }
    public restoreFightingStrength(): void { this._fightingStrengthRemaining = 0; }
    
    constructor(ownedBy: Player){
        super(ownedBy);
    }
}