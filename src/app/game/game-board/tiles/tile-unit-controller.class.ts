import { LeaderUnit } from "../units/leader-unit.class";
import { SoldierUnit } from "../units/soldier-unit.class";
import { Unit } from "../units/unit.class";

export class TileUnitController {

    private _units: Unit[] = [];
    public get units(): Unit[] { return this._units; }
    public get unitCount(): number { return this.units.length; }
    public get soldiers(): SoldierUnit[] { return this._getSoldiers(); }
    public get soldiersCount(): number { return this.soldiers.length; }


    constructor() {

    }

    public placeLeader(leader: LeaderUnit) {
        this.addUnit(leader);
    }

    public addUnit(unit: Unit) {
        this._units.push(unit);
    }
    public transferOutSoldiers(count: number):SoldierUnit[] {
        const soldiers: SoldierUnit[] = []; 
        let soldiersCount = this.soldiersCount;
        let remainingToTransfer: number = count;
        while(soldiersCount > 0 && remainingToTransfer > 0){
            if(soldiersCount >= remainingToTransfer){
                const soldier = this._eliminateOneSoldier();
                if(soldier){
                    soldiers.push(soldier);
                }
                remainingToTransfer--;
                soldiersCount = this.soldiersCount;
            }else{
                soldiersCount = 0;
            }
        }
        return soldiers;
    }
    public transferInSoldiers(soldiers: SoldierUnit[]): void {
        soldiers.forEach(soldier => {
            this._units.push(soldier);
        });
    }
    public eliminateSoldiers(count: number){
        let soldiersCount = this.soldiersCount;
        let remainingToRemove: number = count;
        while(soldiersCount > 0 && remainingToRemove > 0){
            if(soldiersCount >= remainingToRemove){
                this._eliminateOneSoldier();
                remainingToRemove--;
                soldiersCount = this.soldiersCount;
            }else{
                soldiersCount = 0;
            }
        }
    }
    public eliminateAllUnits() {
        this._units = [];
    }
    public eliminateAllSoldiers() {
        const noSoldiers: Unit[] = this._units.filter(unit => !unit.isSoldier);
        this._units = noSoldiers;
    }

    private _getSoldiers(): SoldierUnit[] {
        const soldiers: SoldierUnit[] = [];
        this._units.forEach(unit => {
            if (unit.isSoldier) {
                soldiers.push(unit);
            }
        });
        return soldiers;
    }
    private _eliminateOneSoldier(): SoldierUnit | null {
        let index = this._units.findIndex(item => item.isSoldier);
        if(index > -1){
            const splice = this._units.splice(index, 1);
            return splice[0];
        }
        return null;
    }

}