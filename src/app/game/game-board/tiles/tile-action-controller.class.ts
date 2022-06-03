import { GamePlayer } from "../../game-player/game-player.class";
import { LeaderUnit } from "../units/leader-unit.class";
import { Unit } from "../units/unit.class";
import { TileState } from "./tile-state.class";
import { Tile } from "./tile.class";

export class TileActionController{

    public static placeLeader(leader: LeaderUnit, units: Unit[], tileState: TileState) {
        this.addUnit(leader, units);
        tileState.hasLeader = true;
        tileState.energyGrowValue += 1;
    }

    public static selectTile(tileState: TileState) {
        tileState.isSelected = true;
    }
    public static deselectTile(tileState: TileState) {
        tileState.isSelected = false;
    }

    public static clickTile(player: GamePlayer, tileOwner: GamePlayer): boolean {
        let isValid = false;
        if (player.playerTurnCount === 0) {
            if (tileOwner === player) {
                isValid = true;
                return isValid;
            }
        } else {
        }
        return isValid;
    }
    public static grow(tileState: TileState) {
        if (tileState.energyGrowValue > 0) {
            tileState.energyValue += tileState.energyGrowValue;
        }
    }

    public static addUnit(unit: Unit, units: Unit[]){
        units.push(unit);
    }


    public static changeOwnership(player: GamePlayer, tileState: TileState) {
        tileState.ownedBy = player;
        tileState.isNeutral = false;
        // this._fillColor = player.baseColor;
    }

    public static takeNeutralTile(attacker: GamePlayer, attackingTile: Tile, tileState: TileState) {
        this.attackOwnedTile(attacker, attackingTile, tileState);
    }

    public static attackOwnedTile(attacker: GamePlayer, attackingTile: Tile, tileState: TileState) {
        const attackingEnergy = attackingTile.tileState.energyValue;
        const defendingEnergy = tileState.energyValue + 1;
        const outcome = attackingEnergy-defendingEnergy;
        attackingTile.tileState.energyValue -= attackingEnergy;
        if(outcome>0){
            this.changeOwnership(attacker, tileState);
            tileState.energyGrowValue = 0;
            tileState.energyValue = outcome;
        }else if(outcome === 0){
            const randomOutcome = Math.random();
            if(randomOutcome >= 0.5){
                this.changeOwnership(attacker, tileState);
                tileState.energyGrowValue = 0;
                tileState.energyValue = 0;
            }else{
                // "Draw";
            }
        }else if(outcome < 0){
            // console.log("Loss.  oof.")
        }
    }

    public static spreadtoOwnedTile(attacker: GamePlayer, attackingTile: Tile, tileState: TileState) {
        const energySpread = attackingTile.tileState.energyValue;
        attackingTile.tileState.energyValue = 0;
        tileState.energyValue += energySpread;
    }
    
    public static disable(tileState: TileState) {
        tileState.isDisabled = true;
    }
    public static setPowerTile(tileState: TileState) {
        tileState.isPowerSource = true;
    }
}