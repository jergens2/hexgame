import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game/game-board/game-board.component';
import { GameComponent } from './game/game.component';
import { UnitComponent } from './game/game-board/units/unit/unit.component';
import { HeaderComponent } from './game/header/header.component';
import { RightColumnComponent } from './game/right-column/right-column.component';
import { LeftColumnComponent } from './game/left-column/left-column.component';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameComponent,
    UnitComponent,
    HeaderComponent,
    RightColumnComponent,
    LeftColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
