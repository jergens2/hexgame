import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from './player/player.class';
import { Game } from './game.class';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _game$: BehaviorSubject<Game> = new BehaviorSubject({} as Game);
  public get game$(): Observable<Game> { return this._game$.asObservable(); }
  public get game(): Game { return this._game$.getValue(); }
  public setGame(game: Game) { this._game$.next(game); }

  public get currentTurn$(): Observable<number> { return this.game.currentTurn$; }
  public get currentTurn(): number { return this.game.currentTurn; }
  public get currentPlayer$(): Observable<Player> { return this.game.currentPlayer$; }
  public get updateTileUnits(): Observable<any> { return this.game.updateTileUnits$; }
  public get currentPlayer(): Player { return this.game.currentPlayer; }

  constructor() { }
}
