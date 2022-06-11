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
    public get fightReadySoldiers(): SoldierUnit[] { return this._getFightReadySoldiers(); }
    public get fightReadySoldiersCount(): number { return this.fightReadySoldiers.length; }

    public getAttackingSoldiers(): SoldierUnit[] { return this._getAttackingSoldiers(); }
    public getMovingSoldiers(): SoldierUnit[] { return this._getMovingSoldiers(); }
    public selectSoldiers(): void { this.soldiers.forEach(soldier => soldier.selectUnit()); }
    public deselectUnits(): void { this.units.forEach(unit => unit.deselectUnit()); }
    public endOfTurnRefresh(): void { this.units.forEach(unit => unit.restoreAll()); }
    public placeLeader(leader: LeaderUnit) { this.addUnit(leader); }
    public addUnit(unit: Unit) { this._units.push(unit); }

    public moveInSoldiers(soldiers: SoldierUnit[]): void {
        soldiers.forEach(soldier => {
            soldier.travel();
            this._units.push(soldier);
        });
    }
    public eliminateSoldiers(count: number) {
        let soldiersCount = this.soldiersCount;
        let remainingToRemove: number = count;
        while (soldiersCount > 0 && remainingToRemove > 0) {
            if (soldiersCount >= remainingToRemove) {
                this._eliminateOneSoldier();
                remainingToRemove--;
                soldiersCount = this.soldiersCount;
            } else {
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

    private _getAttackingSoldiers(): SoldierUnit[] {
        const soldiers: SoldierUnit[] = [];
        let unitCount = this._units.length;
        for (let i = 0; i < unitCount; i++) {
            const unit = this._units[i];
            if (unit.isAttackingSoldier) {
                const soldier = this._units.splice(i, 1);
                if (soldier.length > 0) {
                    soldiers.push(soldier[0]);
                }
                i--;
            }
            unitCount = this._units.length;
        }
        return soldiers;
    }
    private _getMovingSoldiers(): SoldierUnit[] {
        const soldiers: SoldierUnit[] = [];
        let unitCount = this._units.length;
        for (let i = 0; i < unitCount; i++) {
            const unit = this._units[i];
            if (unit.isMovingSoldier) {
                const soldier = this._units.splice(i, 1);
                if (soldier.length > 0) {
                    soldiers.push(soldier[0]);
                }
                i--;
            }
            unitCount = this._units.length;
        }
        return soldiers;
    }

    private _getFightReadySoldiers(): SoldierUnit[] { return this._getSoldiers().filter(soldier => soldier.canFight); }
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
        if (index > -1) {
            const splice = this._units.splice(index, 1);
            return splice[0];
        }
        return null;
    }

}