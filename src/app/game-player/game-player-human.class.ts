import { GamePlayer } from "./game-player.class";

export class GamePlayerHuman extends GamePlayer{

    constructor(color: string, name: string, id: string, isBot: boolean = false) {
        super(color, name, id, false);
    }
}