import { GamePlayer } from "../../game-player/game-player.class";
import { UnitType } from "./unit-type.enum";

/** Game player units, e.g. attacking units, building units, defending units */
export abstract class Unit{

    private _ownedBy: GamePlayer;
    public get ownedBy(): GamePlayer { return this._ownedBy; }
    public abstract get unitType(): UnitType;
    public get isLeader(): boolean { return this.unitType === UnitType.LEADER; }
    public get isSoldier(): boolean { return this.unitType === UnitType.SOLDIER; }
    
    /**
     * 
     * An abstract class is one that cannot be instantiated
     * 
     * An abstract method is one that doesn't have an implementation other than in a child class.
     */
    constructor(ownedBy: GamePlayer){
        this._ownedBy = ownedBy;
    }
}