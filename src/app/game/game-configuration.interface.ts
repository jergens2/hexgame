import { Player } from "./player/player.class";

export interface GameConfiguration{
    players: Player[], 
    canvasWidth: number, 
    canvasHeight: number, 
    tileRadius: number, 
    tileBuffer: number, 
    tileDisabledRate: number, 
    tilePoweredCount: number
}