import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameConfiguration } from '../game-board/game-configuration.class';
import { GameLog } from './game-log.class';

@Injectable({
  providedIn: 'root'
})
export class GameLogService {

  private _gameLog$: BehaviorSubject<GameLog> = new BehaviorSubject(new GameLog());

  public get gameLog(): GameLog{ return this._gameLog$.getValue(); }
  public get gameLog$(): Observable<GameLog> { return this._gameLog$.asObservable(); }

  constructor() { }

  public addToLog(message: string, config: GameConfiguration){
    const gameLog = this.gameLog;
    const entry = gameLog.addToLog(message, config);
    console.log(entry.toString());
    this._gameLog$.next(gameLog);
  }


}
