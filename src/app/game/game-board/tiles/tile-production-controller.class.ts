import { SoldierUnit } from "../units/soldier-unit.class";
import { TileProductionMode } from "./tile-production-mode.enum";
import { Tile } from "./tile.class";

export class TileProductionController{


    /** evaluate and recalculate at the end of every turn */
    public static evaluateProduction(tile: Tile){
        let productionRate: number = 0;
        if(this._hasLeaderUnit(tile)){
            productionRate += 1;
        }
        tile.tileState.accumulatedProduction += productionRate;
        tile.tileState.productionRate = productionRate;

        if(tile.productionMode === TileProductionMode.BUILD_UNITS){
            this._generateUnits(tile);
        }else if(tile.productionMode === TileProductionMode.INCREASE_PRODUCTION){

        }else if(tile.productionMode === TileProductionMode.INCREASE_INTELLIGENCE){

        }
    }

    private static _generateUnits(tile: Tile) {
        let remainingProduction: number = tile.tileState.accumulatedProduction;
        for(let i=0; i<remainingProduction; i++){
            tile.addUnit(new SoldierUnit(tile.owner));
        }
        tile.tileState.accumulatedProduction = 0;
    }

    private static _hasLeaderUnit(tile: Tile): boolean {
        const leaderUnit = tile.unitController.units.find(unit => unit.isLeader);
        return (leaderUnit !== undefined);
     }
}
