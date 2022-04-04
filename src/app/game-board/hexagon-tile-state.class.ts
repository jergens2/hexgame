import { GamePlayer } from "./game-player.class";

export interface HexagonTileState {
    isNeutral: boolean;
    ownedBy: GamePlayer;
    powerValue: number;
    powerLevel: number;
    growthAccumulation: number;
}
