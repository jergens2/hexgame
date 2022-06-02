import { GamePlayer } from "../../game-player/game-player.class";
import { Unit } from "./unit.class";

export class LeaderUnit extends Unit {
    constructor(ownedBy: GamePlayer){
        super(ownedBy);
    }
}