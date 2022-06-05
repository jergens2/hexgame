import { Component, OnInit } from '@angular/core';
import { GameBoard } from './game-board/game-board.class';
import { GameState } from './game-state.class';
import { PlayerBuilder } from './player/player-builder.class';
import { Player } from './player/player.class';
import { Game } from './game.class';
import { GameService } from './game.service';
import { GameConfiguration } from './game-configuration.interface';
import { Tile } from './game-board/tiles/tile.class';

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
  public get players(): Player[] { return this.game.players; }
  public get currentPlayer(): Player { return this.game.currentPlayer; }
  public get currentTurn(): number { return this.game.currentTurn; }
  public get passButtonEnabled(): boolean { return this._passButtonEnabled; }
  public get selectedTile(): Tile | undefined { return this.game.selectedTile; }
  public get currentPlayerNgStyle(): any { return this._currentPlayerNgStyle; }

  ngOnInit(): void {
    const state = this._buildGameState();
    const game = new Game(state);
    this._gameService.setGame(game);
    this.game.currentPlayer$.subscribe(player => this._currentPlayerNgStyle = {'background-color': player.baseColor});
    game.startGame();
  }  

  public onClickEndTurnButton(){
    this.game.onClickEndTurn();
  }

  private _buildGameState(): GameState{
    // const players = GamePlayerBuilder.buildPlayers(1, 5);
    const players = PlayerBuilder.buildPlayers(6,0);
    // const players = GamePlayerBuilder.buildPlayers(0, 6);
    const configuration: GameConfiguration = { 
      players: players, 
      canvasWidth: 768, 
      canvasHeight: 768, 
      tileRadius: 8, 
      tileBuffer: 2, 
      tileDisabledRate: 0.05, 
      tilePoweredCount: 12
    };
    return new GameState(configuration);
  }

}
