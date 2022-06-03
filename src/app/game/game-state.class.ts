import { BehaviorSubject, Observable } from "rxjs";
import { GameConfiguration } from "./game-configuration.interface";
import { GamePlayer } from "./game-player/game-player.class";

export class GameState {

    private _configuration: GameConfiguration;
    private _currentPlayer$: BehaviorSubject<GamePlayer>;
    private _currentTurn$: BehaviorSubject<number> = new BehaviorSubject(1);

    public get players(): GamePlayer[] { return this._configuration.players; }
    public get playerCount(): number { return this._configuration.players.length; }
    public get currentPlayer(): GamePlayer { return this._currentPlayer$.getValue(); }
    public get currentPlayer$(): Observable<GamePlayer> { return this._currentPlayer$.asObservable(); }
    public get currentTurn(): number { return this._currentTurn$.getValue(); }
    public get currentTurn$(): Observable<number> { return this._currentTurn$.asObservable(); }
    public get canvasWidth(): number { return this._configuration.canvasWidth; }
    public get canvasHeight(): number { return this._configuration.canvasHeight; }
    public get tileRadius(): number { return this._configuration.tileRadius; }
    public get tileBuffer(): number { return this._configuration.tileBuffer; }
    public get tileDisabledRate(): number { return this._configuration.tileDisabledRate; }
    public get tilePoweredCount(): number { return this._configuration.tilePoweredCount; }

    constructor(configuration: GameConfiguration) {
        this._configuration = configuration;
        this._currentPlayer$ = new BehaviorSubject(this.players[0]);
    }

    public incrementPlayer(){
        this.currentPlayer.incrementTurnCount();
        let newIndex = this.players.indexOf(this.currentPlayer) + 1;
        if (newIndex >= this.playerCount) {
            newIndex = 0;
        }
        this._currentPlayer$.next(this.players[newIndex]);
        if(newIndex === 0){
            this._incrementTurn();
        }
    }

    private _incrementTurn() {
        this._currentTurn$.next(this.currentTurn + 1);
        console.log(this.currentTurn + " <-- current turn")
    }

}
