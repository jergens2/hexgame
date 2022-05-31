import { GamePlayerBot } from "./game-player-bot.class";
import { GamePlayerHuman } from "./game-player-human.class";
import { GamePlayer } from "./game-player.class";

export class GamePlayerBuilder{

    constructor(){

    }
    public buildPlayers(humanCount: number, botCount: number): GamePlayer[]{
        /**
         * as of now max players can only be 6 due to the predefined starting colors.
         */
        const playerCount = humanCount + botCount;
        if(playerCount <= 6){
            const players: GamePlayer[] = [];
            
            const randomIndex = Math.floor(Math.random() * (this._sampleStartingColors.length));
            let currentIndex = randomIndex; 
            let isHuman: boolean = false;
            for(let i=0; i<playerCount; i++){
                let playerNumber = i+1;
                if(playerNumber <= humanCount){
                    isHuman = true;
                }else{
                    isHuman = false;
                }
                const name = "Player " + playerNumber;
                const color = this._sampleStartingColors[currentIndex];
                currentIndex++;
                if(currentIndex >= this._sampleStartingColors.length){
                    currentIndex = 0;
                }

                if(isHuman === true){
                    players.push(new GamePlayerHuman(color, name, String(i), true));
                }else{
                    players.push(new GamePlayerBot(color, name, String(i), false));
                }               
                playerNumber++;
            }
            return players;
        }else{
            console.log("Error: can only have max 6 players");
            return [];
        }
    }
    private _sampleStartingColors: string[] = [
        'rgb(204, 255, 204)',
        'rgb(255, 255, 204)',
        'rgb(255, 204, 204)',
        'rgb(255, 204, 255)',
        'rgb(204, 204, 255)',
        'rgb(204, 255, 255)',
    ];


}