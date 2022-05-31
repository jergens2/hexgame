import { BehaviorSubject, Observable } from "rxjs";
import { GamePlayer } from "../game-player/game-player.class";

export class GameConfiguration {

    private _players: GamePlayer[] = [];
    private _currentPlayer$: BehaviorSubject<GamePlayer>;
    private _currentTurn$: BehaviorSubject<number> = new BehaviorSubject(1);

    private _canvasWidth: number;
    private _canvasHeight: number;
    private _tileRadius: number;
    private _tileBuffer: number;
    private _tileDisabledRate: number;
    private _tilePoweredCount: number;

    public get playerCount(): number { return this._players.length; }
    public get players(): GamePlayer[] { return this._players; }
    public get currentPlayer(): GamePlayer { return this._currentPlayer$.getValue(); }
    public get currentPlayer$(): Observable<GamePlayer> { return this._currentPlayer$.asObservable(); }
    public get currentTurn(): number { return this._currentTurn$.getValue(); }
    public get currentTurn$(): Observable<number> { return this._currentTurn$.asObservable(); }
    public get canvasWidth(): number { return this._canvasWidth; }
    public get canvasHeight(): number { return this._canvasHeight; }
    public get tileRadius(): number { return this._tileRadius; }
    public get tileBuffer(): number { return this._tileBuffer; }
    public get tileDisabledRate(): number { return this._tileDisabledRate; }
    public get tilePoweredCount(): number { return this._tilePoweredCount; }

    constructor(players: GamePlayer[], canvasWidth: number, canvasHeight: number, tileRadius: number, tileBuffer: number, tileDisabledRate: number, tilePoweredCount: number) {
        this._players = players;
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._tileRadius = tileRadius;
        this._tileBuffer = tileBuffer;
        this._tileDisabledRate = tileDisabledRate;
        this._tilePoweredCount = tilePoweredCount;
        this._currentPlayer$ = new BehaviorSubject(this._players[0]);
    }

    public incrementPlayer(){
        this.currentPlayer.incrementTurnCount();
        let newIndex = this._players.indexOf(this.currentPlayer) + 1;
        if (newIndex >= this.playerCount) {
            newIndex = 0;
        }
        this._currentPlayer$.next(this._players[newIndex]);
        if(newIndex === 0){
            this._incrementTurn();
        }
    }

    private _incrementTurn() {
        this._currentTurn$.next(this.currentTurn + 1);
    }






}