import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainPageComponent } from './components/pages/main/main-page.component';
import { DetailsPageComponent } from './components/pages/details/details-page.component';
import { RijksmuseumClientService } from './services/rijksmuseum-client.service';
import { HttpClientModule } from '@angular/common/http';
import { TilesListComponent } from './components/tiles-list/tiles-list.component';
import { TileComponent } from './components/tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DetailsPageComponent,
    TilesListComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [RijksmuseumClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
