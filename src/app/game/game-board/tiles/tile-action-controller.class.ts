import { Player } from "../../player/player.class";
import { SoldierUnit } from "../units/soldier-unit.class";
import { TileState } from "./tile-state.class";
import { Tile } from "./tile.class";

export class TileActionController {

    public static selectTile(tile: Tile, player: Player) {
        tile.tileState.isSelected = true;
        if(tile.owner === player){
            tile.unitController.selectSoldiers();
        }
    }
    public static deselectTile(tile: Tile) {
        tile.tileState.isSelected = false;
        tile.unitController.deselectUnits();
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
        const movingSoldiers = startTile.getMovingSoldiers();
        destinationTile.moveInSoldiers(movingSoldiers);
    }

    public static attackTile(attackingTile: Tile, defendingTile: Tile) {
        const attackingSoldiers = attackingTile.getAttackingSoldiers();
        if (attackingSoldiers.length > 0) {
            const attacker: Player = attackingSoldiers[0].ownedBy;
            const defendingSoldiers = defendingTile.unitController.fightReadySoldiers;
            const defendingSoldiersCount = defendingSoldiers.length;
            const difference = attackingSoldiers.length - defendingSoldiers.length;
            const attackerWins = difference > 0;
            const defenderWins = difference < 0;
            const tie = difference === 0;
            if (attackerWins) {
                this.changeOwnership(defendingTile, attacker);
                while(attackingSoldiers.length >= difference){
                    attackingSoldiers.splice(0, 1);
                }
                attackingSoldiers.forEach(soldier => soldier.diminishFightingStrength());
                defendingTile.moveInSoldiers(attackingSoldiers);
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

    public static getSelectedTile(tiles: Tile[]): Tile | undefined {
        return tiles.find(tile => tile.isSelected);
    }


}
