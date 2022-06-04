import { GamePlayer } from "../../game-player/game-player.class";
import { TileProductionMode } from "./tile-production-mode.enum";

export interface TileState {
    isNeutral: boolean;
    isDisabled: boolean;
    isPowerSource: boolean;
    ownedBy: GamePlayer;
    isSelected: boolean;
    productionRate: number;
    accumulatedProduction: number;
    productionMode: TileProductionMode;
}
