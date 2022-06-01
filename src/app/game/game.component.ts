import { Component, OnInit } from '@angular/core';
import { GameBoard } from './game-board/game-board.class';
import { GameState } from './game-state.class';
import { GamePlayerBuilder } from './game-player/game-player-builder.class';
import { GamePlayer } from './game-player/game-player.class';
import { Game } from './game.class';
import { GameService } from './game.service';
import { GameConfiguration } from './game-configuration.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  private _passButtonEnabled: boolean = true;
  private _currentPlayerNgStyle: any = {};

  public get game(): Game { return this._gameService.game; }
  public get gameBoard(): GameBoard { return this.game.board; }
  public get players(): GamePlayer[] { return this.game.players; }
  public get currentPlayer(): GamePlayer { return this.game.currentPlayer; }
  public get passButtonEnabled(): boolean { return this._passButtonEnabled; }

  public get currentPlayerNgStyle(): any { return this._currentPlayerNgStyle; }

  public onClickPass(){
    this.game.onClickPass();
  }

  ngOnInit(): void {
    const configuration = this._getConfiguration();
    const game = new Game(configuration);
    this._gameService.setGame(game);
  }  

  private _getConfiguration(): GameState{
    const players = GamePlayerBuilder.buildPlayers(1, 5);
    // const players = GamePlayerBuilder.buildPlayers(0, 6);
    const configuration: GameConfiguration = { 
      players: players, 
      canvasWidth: 768, 
      canvasHeight: 768, 
      tileRadius: 10, 
      tileBuffer: 2, 
      tileDisabledRate: 0.05, 
      tilePoweredCount: 12
    };
    return new GameState(configuration);
  }

}
