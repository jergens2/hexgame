import { BotPlayer } from "./bot-player.class";
import { HumanPlayer } from "./human-player.class";
import { Player } from "./player.class";

export class PlayerBuilder {


    public static buildPlayers(humanCount: number, botCount: number): Player[] {
        const sampleStartingColors = [
            'rgb(204, 255, 204)',
            'rgb(255, 255, 204)',
            'rgb(255, 204, 204)',
            'rgb(255, 204, 255)',
            'rgb(204, 204, 255)',
            'rgb(204, 255, 255)',
        ];

        /**
         * as of now max players can only be 6 due to the predefined starting colors.
         */
        const playerCount = humanCount + botCount;
        if (playerCount <= 6) {
            const players: Player[] = [];

            const randomIndex = Math.floor(Math.random() * (sampleStartingColors.length));
            let currentIndex = randomIndex;
            let isHuman: boolean = false;
            for (let i = 0; i < playerCount; i++) {
                let playerNumber = i + 1;
                if (playerNumber <= humanCount) {
                    isHuman = true;
                } else {
                    isHuman = false;
                }
                const name = "Player " + playerNumber;
                const color = sampleStartingColors[currentIndex];
                currentIndex++;
                if (currentIndex >= sampleStartingColors.length) {
                    currentIndex = 0;
                }

                if (isHuman === true) {
                    players.push(new HumanPlayer(color, name, String(i), true));
                } else {
                    players.push(new BotPlayer(color, name, String(i), false));
                }
                playerNumber++;
            }
            return players;
        } else {
            console.log("Error: can only have max 6 players");
            return [];
        }
    }

}