import { LeaderUnit } from "../units/leader-unit.class";
import { SoldierUnit } from "../units/soldier-unit.class";
import { Unit } from "../units/unit.class";

export class TileUnitController {

    private _units: Unit[] = [];
    public get units(): Unit[] { return this._units; }
    public get unitCount(): number { return this.units.length; }
    public get hasUnits(): boolean { return this.unitCount > 0; }
    public get soldiers(): SoldierUnit[] { return this._getSoldiers(); }
    public get soldiersCount(): number { return this.soldiers.length; }
    public get readySoldiers(): SoldierUnit[] { return this._getSoldiers(true); }
    public get readySoldiersCount(): number { return this.readySoldiers.length; }


    constructor() {

    }

    public selectSoldiers(): void{ 
        this.soldiers.forEach(soldier => soldier.selectUnit());
    }

    public endOfTurnRefresh(): void{
        if(this.hasUnits){
            this.units.forEach(unit => unit.restoreTravelDistance());
        }
    }

    public placeLeader(leader: LeaderUnit) {
        this.addUnit(leader);
    }

    public addUnit(unit: Unit) {
        this._units.push(unit);
    }
    public transferOutSoldiers(count: number):SoldierUnit[] {
        const soldiers: SoldierUnit[] = []; 
        let soldiersCount = this.readySoldiersCount;
        let remainingToTransfer: number = count;
        while(soldiersCount > 0 && remainingToTransfer > 0){
            if(soldiersCount >= remainingToTransfer){
                const soldier = this._eliminateOneSoldier(true);
                if(soldier){
                    soldiers.push(soldier);
                }
                remainingToTransfer--;
                soldiersCount = this.readySoldiersCount;
            }else{
                soldiersCount = 0;
            }
        }
        return soldiers;
    }
    public transferInSoldiers(soldiers: SoldierUnit[]): void {
        soldiers.forEach(soldier => {
            soldier.travel();
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

    private _getSoldiers(readySoldiersOnly: boolean = false): SoldierUnit[] {
        const soldiers: SoldierUnit[] = [];
        this._units.forEach(unit => {
            if (unit.isSoldier) {
                if(readySoldiersOnly === true){
                    if(unit.canTravel){
                        soldiers.push(unit);
                    }
                }else{
                    soldiers.push(unit);
                }
            }
        });
        return soldiers;
    }
    private _eliminateOneSoldier(readySoldiersOnly: boolean = false): SoldierUnit | null {
        let index = this._units.findIndex(item => item.isSoldier);
        if(readySoldiersOnly === true){
            index = this._units.findIndex(item => item.isSoldier && item.canTravel);
        }
        if(index > -1){
            const splice = this._units.splice(index, 1);
            return splice[0];
        }
        return null;
    }

}