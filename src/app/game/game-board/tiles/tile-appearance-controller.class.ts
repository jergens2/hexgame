import { TileAppearance } from "./tile-appearance.interface";
import { Tile } from "./tile.class";

export class TileAppearanceController{

    public static getAppearance(tile: Tile): TileAppearance{
        const appearance: TileAppearance = {
            text: '',
            font: '8px Arial',
            textAlign: 'center',
            textBaseline: 'middle',
            fillStyle: 'string',
            strokeStyle: 'string',
            textStrokeStile: 'string',
            lineWidth: 4,
        };
        if(tile.isDisabled){
            appearance.lineWidth = 2;
            // appearance.fillStyle = 'rgba(245, 39, 145, 0)'
            // appearance.strokeStyle = 'rgba(245, 39, 145, 0)';
            appearance.fillStyle = 'gray';
            appearance.strokeStyle = 'gray';

        }else if(tile.isPowerTile){
            appearance.fillStyle = 'red'
            appearance.strokeStyle = 'black';
        }else{
            appearance.fillStyle = tile.owner.colorSwatch[0];
            appearance.strokeStyle = tile.owner.colorSwatch[0];
            appearance.lineWidth = 2;
            let hasLeader: boolean = false;
            tile.unitController.units.forEach(tile => {
                if(tile.isLeader){ 
                    hasLeader = true;
                }
            });
            if(hasLeader){ 
                appearance.lineWidth = 2;
                appearance.fillStyle = tile.owner.colorSwatch[4];
                appearance.strokeStyle = 'black';
            }
            if(tile.isSelected){
                appearance.lineWidth = 4;
                appearance.strokeStyle = 'gray';
            }
            const soldiersCount = tile.unitController.soldiersCount;
            const readySoldiersCount = tile.unitController.fightReadySoldiersCount;
            if(soldiersCount > 0){
                appearance.text = String(tile.unitController.soldiersCount);
                if(readySoldiersCount < (soldiersCount/2)){
                    appearance.strokeStyle = 'rgb(148, 0, 0)';
                }
            }
        }       
        return appearance;
    }
}