import { Player } from "../../player/player.class";
import { TileProductionMode } from "./tile-production-mode.enum";

export interface TileState {
    isNeutral: boolean;
    isDisabled: boolean;
    isPowerSource: boolean;
    ownedBy: Player;
    isSelected: boolean;
    productionRate: number;
    accumulatedProduction: number;
    productionMode: TileProductionMode;
}
