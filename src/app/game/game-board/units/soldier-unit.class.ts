import { GamePlayer } from "../../game-player/game-player.class";
import { UnitType } from "./unit-type.enum";
import { Unit } from "./unit.class";

export class SoldierUnit extends Unit{

    public readonly unitType: UnitType = UnitType.SOLDIER;

    constructor(owner: GamePlayer){
        super(owner);
    }
}