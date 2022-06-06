import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game.class';
import { GameService } from '../game.service';
import { Player } from '../player/player.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  private _currentPlayerNgStyle: any = {};

  public get currentPlayerNgStyle(): any { return this._currentPlayerNgStyle; }
  public get game(): Game { return this._gameService.game; }
  public get players(): Player[] { return this.game.players; }
  public get currentPlayer(): Player { return this.game.currentPlayer; }
  public get currentTurn(): number { return this.game.currentTurn; }

  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
    this.game.currentPlayer$.subscribe(player => this._currentPlayerNgStyle = {'background-color': player.baseColor});
  }

}
