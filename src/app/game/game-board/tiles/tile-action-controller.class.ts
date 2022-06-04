import { GamePlayer } from "../../game-player/game-player.class";
import { TileState } from "./tile-state.class";
import { Tile } from "./tile.class";

export class TileActionController{

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
    public static grow(tileState: TileState) {}

    public static changeOwnership(tile: Tile, owner: GamePlayer) {
        tile.tileState.ownedBy = owner;
        tile.tileState.isNeutral = false;
    }

    public static attackTile(attackingTile: Tile, defendingTile: Tile){
        const attackingSoldiers = attackingTile.unitController.soldiers;
        const attacker: GamePlayer = attackingSoldiers[0].ownedBy;
        const defendingSoldiers = defendingTile.unitController.soldiers;
        const difference = attackingSoldiers.length - defendingSoldiers.length;
        const attackerWins = difference > 0;
        const defenderWins = difference < 0;
        const tie = difference === 0;
        if(attackerWins){
            /** currently nothing in here to control whether a player "attacks" themselves and removes their own leader */
            this.changeOwnership(defendingTile, attacker);
            defendingTile.eliminateAllUnits();
            const attackersEliminated: number = attackingSoldiers.length - difference;
            if(attackersEliminated > 0){
                attackingTile.eliminateSoldiers(attackersEliminated);
            }
            const transferSoldiers = attackingTile.transferOutSoldiers(difference);
            defendingTile.transferInSoldiers(transferSoldiers);
        }else if(defenderWins){
            attackingTile.eliminateAllSoldiers();
            defendingTile.eliminateSoldiers(Math.abs(difference));
        }else if(tie){
            attackingTile.eliminateAllSoldiers();
            defendingTile.eliminateAllSoldiers();
        }
    }
    
    public static disable(tileState: TileState) {
        tileState.isDisabled = true;
    }
    public static setPowerTile(tileState: TileState) {
        tileState.isPowerSource = true;
    }
}
