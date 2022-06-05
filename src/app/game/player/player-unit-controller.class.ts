import { Tile } from "../game-board/tiles/tile.class";
import { Unit } from "../game-board/units/unit.class";
import { Player } from "./player.class";

export class PlayerUnitController {

    public static findAllUnits(player: Player, tiles: Tile[]): Unit[] {
        const units: Unit[] = [];
        tiles.forEach(tile => {
            const isSameOwner: boolean = tile.owner.id === player.id;
            if (isSameOwner) {
                const unitController = tile.unitController;
                if (unitController.hasUnits) {
                    unitController.units.forEach(unit => {
                        units.push(Object.assign({}, unit));
                    });
                }
            }
        });
        return units
    }

    /** units not exhausted */
    public static findReadyUnits(player: Player, tiles: Tile[]): Unit[] {
        const readyUnits: Unit[] = [];
        tiles.forEach(tile => {
            const isSameOwner: boolean = tile.owner.id === player.id;
            if (isSameOwner) {
                const unitController = tile.unitController;
                if (unitController.hasUnits) {
                    unitController.units.forEach(unit => {
                        if (unit.canTravel) {
                            readyUnits.push(Object.assign({}, unit));
                        }
                    });
                }
            }
        });
        return readyUnits
    }

    public static hasReadyUnits(player: Player, tiles: Tile[]): boolean {
        const readyUnits = this.findReadyUnits(player, tiles);
        let hasReadyUnits: boolean = false;
        if (readyUnits.length > 0) {
            hasReadyUnits = true;
        }
        return hasReadyUnits;
    }
}