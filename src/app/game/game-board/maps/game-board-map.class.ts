import { GameState } from "../../game-state.class";
import { TileHexagon } from "../tiles/tile-hexagon";

/** A helper class for the purpose of better distributing players and power tiles more evenly on the board */
export class GameBoardMap{
    private _config: GameState;
    constructor(config: GameState, tiles: TileHexagon[]){
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