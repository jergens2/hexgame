import { Player } from "../../player/player.class";
import { SoldierUnit } from "../units/soldier-unit.class";
import { TileState } from "./tile-state.class";
import { Tile } from "./tile.class";

export class TileActionController {

    public static selectTile(tileState: TileState) {
        tileState.isSelected = true;
    }
    public static deselectTile(tileState: TileState) {
        tileState.isSelected = false;
    }

    public static clickTile(player: Player, tileOwner: Player): boolean {
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
    public static grow(tileState: TileState) { }

    public static changeOwnership(tile: Tile, owner: Player) {
        tile.tileState.ownedBy = owner;
        tile.tileState.isNeutral = false;
    }

    public static moveSoldiers(startTile: Tile, destinationTile: Tile): void {
        const transfer = startTile.transferOutSoldiers(startTile.unitController.soldiersCount);
        destinationTile.transferInSoldiers(transfer);
    }

    public static attackTile(attackingTile: Tile, defendingTile: Tile) {
        const attackingSoldiers = attackingTile.unitController.readySoldiers;
        if (attackingSoldiers.length > 0) {
            const attacker: Player = attackingSoldiers[0].ownedBy;
            const defendingSoldiers = defendingTile.unitController.readySoldiers;
            const defendingSoldiersCount = defendingSoldiers.length;
            const difference = attackingSoldiers.length - defendingSoldiers.length;
            const attackerWins = difference > 0;
            const defenderWins = difference < 0;
            const tie = difference === 0;
            if (attackerWins) {
                this.changeOwnership(defendingTile, attacker);
                attackingTile.eliminateSoldiers(defendingSoldiersCount);
                defendingTile.eliminateAllUnits();
                const transferSoldiers = attackingTile.transferOutSoldiers(difference);
                defendingTile.transferInSoldiers(transferSoldiers);
            } else if (defenderWins) {
                attackingTile.eliminateAllSoldiers();
                defendingTile.eliminateSoldiers(Math.abs(difference));
            } else if (tie) {
                attackingTile.eliminateAllSoldiers();
                defendingTile.eliminateAllSoldiers();
            }
        }
    }

    public static disable(tileState: TileState) {
        tileState.isDisabled = true;
    }
    public static setPowerTile(tileState: TileState) {
        tileState.isPowerSource = true;
    }
}
