import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainPageComponent } from './components/pages/main/main-page.component';
import { DetailsPageComponent } from './components/pages/details/details-page.component';
import { RijksmuseumClientService } from './services/rijksmuseum-client.service';
import { TilesListComponent } from './components/tiles-list/tiles-list.component';
import { TileComponent } from './components/tile/tile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderBySelectorComponent } from './components/order-by-selector/order-by-selector.component';
import { PageSizeSelectorComponent } from './components/page-size-selector/page-size-selector.component';
import { TileDetailsComponent } from './components/tile-details/tile-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DetailsPageComponent,
    TilesListComponent,
    TileComponent,
    TileDetailsComponent,
    SearchBarComponent,
    OrderBySelectorComponent,
    PageSizeSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RijksmuseumClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
