import { TileAppearance } from "./tile-appearance.interface";
import { Tile } from "./tile.class";

export class TileAppearanceController{

    public static getAppearance(tile: Tile): TileAppearance{
        const appearance: TileAppearance = {
            font: '8px Arial',
            textAlign: 'center',
            textBaseline: 'middle',
            fillStyle: 'string',
            strokeStyle: 'string',
            lineWidth: 2,
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

            }
        }       
        return appearance;
    }
}