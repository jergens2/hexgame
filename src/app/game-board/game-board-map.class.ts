import { GameConfiguration } from "./game-configuration.class";
import { HexagonTile } from "./hexagon-tile.class";

/** A helper class for the purpose of better distributing players and power tiles more evenly on the board */
export class GameBoardMap{
    private _config: GameConfiguration;
    constructor(config: GameConfiguration, tiles: HexagonTile[]){
        this._config = config;
        const playerCount = this._config.playerCount;
        


        /**
         * x = radius*cos(angle);
            y = radius*sin(angle);
         */

        // const x = 


        // tiles.forEach(tile => {
        //     console.log(tile.centerPoint)
        // })
    }


}