import { Player } from "./player.class";

export class HumanPlayer extends Player{

    constructor(color: string, name: string, id: string, isBot: boolean = false) {
        super(color, name, id, false);
    }
}