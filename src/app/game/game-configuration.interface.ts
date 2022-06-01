import { GamePlayer } from "./game-player/game-player.class";

export interface GameConfiguration{
    players: GamePlayer[], 
    canvasWidth: number, 
    canvasHeight: number, 
    tileRadius: number, 
    tileBuffer: number, 
    tileDisabledRate: number, 
    tilePoweredCount: number
}