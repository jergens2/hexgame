import { TileNeighbourFinder } from "../game-board/tiles/tile-neighbour-finder.class";
import { Tile } from "../game-board/tiles/tile.class";
import { LeaderUnit } from "../game-board/units/leader-unit.class";
import { GamePlayer } from "./game-player.class";

export class GamePlayerBot extends GamePlayer {
    constructor(color: string, name: string, id: string, isBot: boolean = true) {
        super(color, name, id, true);
    }

    public takeBotTurn(tiles: Tile[]) {
        
        const ownedTiles: Tile[] = tiles.filter(tile => {
            let isOwned: boolean = false;
            if(tile.isOwned){
                if(tile.tileOwner.id === this.id){
                    isOwned = true;
                }
            }
            return isOwned;
        });
        
        if(this.playerTurnCount === 0){
            let randomIndex = Math.floor(Math.random() * (ownedTiles.length - 1));
            const leader = new LeaderUnit(this);
            ownedTiles[randomIndex].placeLeader(leader);
        }else{
            const energyTiles: Tile[] = [];
            tiles.forEach(tile => {
                if(tile.isOwned){
                    if(tile.tileOwner === this){
                        if(tile.tileState.energyValue > 0){
                            energyTiles.push(tile);
                        }
                    }
                }
            });
            const sortedTiles = energyTiles.sort((t1, t2)=>{
                if(t1.tileState.energyValue > t2.tileState.energyValue){
                    return -1;
                }else if(t1.tileState.energyValue < t2.tileState.energyValue){
                    return 1;
                }else{
                    return 0;
                }
            });
            if(sortedTiles.length > 0){
                let actionTaken: boolean = false;
                let index = 0;
                while(actionTaken === false && index < sortedTiles.length){
                    const neutrals: Tile[] = TileNeighbourFinder.getNeutralNeighboursOf(sortedTiles[index], tiles); 
                    const opponents: Tile[] = TileNeighbourFinder.getOpponentNeighboursOf(sortedTiles[index], tiles); 
                    const ownedTiles: Tile[] = TileNeighbourFinder.getOwnedNeighboursOf(sortedTiles[index], tiles); 
                    if(neutrals.length > 0){
                        this._getRandomTile(neutrals).takeNeutralTile(this, sortedTiles[index]);
                        actionTaken = true;
                    }else if(opponents.length > 0){
                        const weakestOpponent = opponents.sort((o1, o2)=>{
                            if(o1.tileState.energyValue < o2.tileState.energyValue){
                                return -1;
                            }else if(o1.tileState.energyValue > o2.tileState.energyValue){
                                return 1;
                            }else{
                                return 0;
                            }
                        })[0];
                        if(sortedTiles[index].tileState.energyValue > (weakestOpponent.tileState.energyValue+1)){
                            weakestOpponent.attackOwnedTile(this, sortedTiles[index]);
                        }
                        actionTaken = true;
                    }else if(ownedTiles.length > 0){
                        this._getRandomTile(ownedTiles).spreadtoOwnedTile(this, sortedTiles[index])
                    }else{
                        console.log("No action taken");
                    }
                    index++;
                }
            }
        }
    }



    /** returns a random tile from an array */
    private _getRandomTile(tiles: Tile[]){
        const randomIndex: number = Math.floor(Math.random() * tiles.length);
        console.log("Random index from " + tiles.length + " is : " + randomIndex);
        return tiles[randomIndex];
    }


}