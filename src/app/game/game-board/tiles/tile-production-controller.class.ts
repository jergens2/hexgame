import { SoldierUnit } from "../units/soldier-unit.class";
import { WorkerUnit } from "../units/worker-unit.class";
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

        if(tile.productionMode === TileProductionMode.PRODUCE_SOLDIERS){
            this._generateUnits(tile, TileProductionMode.PRODUCE_SOLDIERS);
        }else if(tile.productionMode === TileProductionMode.PRODUCE_BUILDERS){
            this._generateUnits(tile, TileProductionMode.PRODUCE_BUILDERS);
        }else if(tile.productionMode === TileProductionMode.PRODUCE_INTELLIGENCE){

        }else if(tile.productionMode === TileProductionMode.PRODUCE_GROWTH){

        }
    }

    public static changeProductionMode(tile: Tile, mode: TileProductionMode): void{
        tile.tileState.productionMode = mode;
    }

    private static _generateUnits(tile: Tile, productionMode: TileProductionMode) {
        let remainingProduction: number = tile.tileState.accumulatedProduction;
        for(let i=0; i<remainingProduction; i++){
            if(productionMode === TileProductionMode.PRODUCE_SOLDIERS){
                tile.addUnit(new SoldierUnit(tile.owner));
            }else if(productionMode === TileProductionMode.PRODUCE_BUILDERS){
                tile.addUnit(new WorkerUnit(tile.owner));
            }
        }
        tile.tileState.accumulatedProduction = 0;
    }

    private static _hasLeaderUnit(tile: Tile): boolean {
        const leaderUnit = tile.unitController.units.find(unit => unit.isLeader);
        return (leaderUnit !== undefined);
     }
}
