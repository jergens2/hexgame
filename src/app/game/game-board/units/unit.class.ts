import { GamePlayer } from "../../game-player/game-player.class";

/** Game player units, e.g. attacking units, building units, defending units */
export abstract class Unit{

    private _ownedBy: GamePlayer;
    public get ownedBy(): GamePlayer{ return this._ownedBy; }
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