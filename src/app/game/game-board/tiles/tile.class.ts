import { GamePlayer } from "../../game-player/game-player.class";
import { Unit } from "../units/unit.class";
import { TileHexagon } from "./tile-hexagon";
import { TileProductionMode } from "./tile-production-mode.enum";
import { TileState } from "./tile-state.class";
import { TileModifier } from "./tile-modifier.class";
import { TileActionController } from "./tile-action-controller.class";
import { LeaderUnit } from "../units/leader-unit.class";

export class Tile{ 

    private _units: Unit[] = [];
    private _modifiers: TileModifier [] = [];
    private _productionMode: TileProductionMode = TileProductionMode.BUILD_UNITS;
    private _hexagon: TileHexagon;
    private _tileState: TileState;
    private _actionController: TileActionController;

    public get tileState(): TileState { return this._tileState; }
    public get tileOwner(): GamePlayer { return this.tileState.ownedBy; }
    public get isOwned(): boolean { return !this.tileState.isNeutral; }
    public get isNeutral(): boolean { return this.tileState.isNeutral; }
    public get isDisabled(): boolean { return this.tileState.isDisabled; }
    public get isPowerTile(): boolean { return this.tileState.isPowerSource; }
    public get isSelected(): boolean { return this.tileState.isSelected; }
    public get hasActions(): boolean { return this._actionController.hasActions; }

    public get units(): Unit[] { return this._units; }
    public get productionMode(): TileProductionMode { return this._productionMode; }
    public get hexagon(): TileHexagon { return this._hexagon; }

    constructor(hexagon: TileHexagon){
        this._hexagon = hexagon;
        this._tileState = {
            isNeutral: true,
            isDisabled: false,
            isPowerSource: false,
            ownedBy: new GamePlayer('', '', '', true),
            hasLeader: false,
            energyValue: 0,
            energyGrowValue: 0.01,
            isSelected: false,
            // powerValue: 0,
            // powerLevel: 0,
            // growthAccumulation: 0,
        };
        this._actionController = new TileActionController();
    }


    public selectTile() {
        this._tileState.isSelected = true;
    }
    public deselectTile() {
        this._tileState.isSelected = false;
    }

    public clickTile(player: GamePlayer): boolean {
        let isValid = false;
        if (player.playerTurnCount === 0) {
            if (this.tileOwner === player) {
                isValid = true;
                return isValid;
            }
        } else {
        }
        return isValid;
    }
    public grow() {
        if (this.tileState.energyGrowValue > 0) {
            this._tileState.energyValue += this.tileState.energyGrowValue;
        }
    }


    public addUnit(unit: Unit){
        this._units.push(unit);
    }

    public placeLeader(leader: LeaderUnit) {
        this.addUnit(leader);
        this._tileState.hasLeader = true;
        this._tileState.energyGrowValue += 1;
    }

    public changeOwnership(player: GamePlayer) {
        this._tileState.ownedBy = player;
        this._tileState.isNeutral = false;
        // this._fillColor = player.baseColor;
    }

    public takeNeutralTile(attacker: GamePlayer, attackingTile: Tile) {
        this.attackOwnedTile(attacker, attackingTile);
    }

    public attackOwnedTile(attacker: GamePlayer, attackingTile: Tile) {
        const attackingEnergy = attackingTile.tileState.energyValue;
        const defendingEnergy = this.tileState.energyValue + 1;
        const outcome = attackingEnergy-defendingEnergy;
        attackingTile._tileState.energyValue -= attackingEnergy;
        if(outcome>0){
            this.changeOwnership(attacker);
            this._tileState.energyGrowValue = 0;
            this._tileState.energyValue = outcome;
        }else if(outcome === 0){
            const randomOutcome = Math.random();
            if(randomOutcome >= 0.5){
                this.changeOwnership(attacker);
                this._tileState.energyGrowValue = 0;
                this._tileState.energyValue = 0;
            }else{
                // "Draw";
            }
        }else if(outcome < 0){
            // console.log("Loss.  oof.")
        }
    }

    public spreadtoOwnedTile(attacker: GamePlayer, attackingTile: Tile) {
        const energySpread = attackingTile.tileState.energyValue;
        attackingTile.tileState.energyValue = 0;
        this.tileState.energyValue += energySpread;
    }
    
    public disable() {
        this._tileState.isDisabled = true;
    }
    public setPowerTile() {
        this._tileState.isPowerSource = true;
    }

}