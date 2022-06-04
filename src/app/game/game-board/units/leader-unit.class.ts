import { GamePlayer } from "../../game-player/game-player.class";
import { UnitType } from "./unit-type.enum";
import { Unit } from "./unit.class";

export class LeaderUnit extends Unit {

    public readonly unitType: UnitType = UnitType.LEADER;
    
    constructor(ownedBy: GamePlayer){
        super(ownedBy);
    }
}