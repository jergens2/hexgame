import { GamePlayer } from "../../game-player/game-player.class";

export interface TileState {
    isNeutral: boolean;
    isDisabled: boolean;
    isPowerSource: boolean;
    ownedBy: GamePlayer;
    hasLeader: boolean;
    energyValue: number;
    energyGrowValue: number;
    isSelected: boolean;
    // powerValue: number;
    // powerLevel: number;
    // growthAccumulation: number;
}
