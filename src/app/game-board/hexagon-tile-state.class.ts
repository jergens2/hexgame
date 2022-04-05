import { GamePlayer } from "./game-player.class";

export interface HexagonTileState {
    isNeutral: boolean;
    isDisabled: boolean;
    isPowerSource: boolean;
    ownedBy: GamePlayer;
    powerValue: number;
    powerLevel: number;
    growthAccumulation: number;
}
