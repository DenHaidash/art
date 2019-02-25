import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainPageComponent } from './components/pages/main/main-page.component';
import { DetailsPageComponent } from './components/pages/details/details-page.component';
import { RijksmuseumClientService } from './services/rijksmuseum-client.service';
import { HttpClientModule } from '@angular/common/http';
import { TilesListComponent } from './components/tiles-list/tiles-list.component';
import { TileComponent } from './components/tile/tile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderBySelectorComponent } from './components/order-by-selector/order-by-selector.component';
import { PageSizeSelectorComponent } from './components/page-size-selector/page-size-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DetailsPageComponent,
    TilesListComponent,
    TileComponent,
    SearchBarComponent,
    OrderBySelectorComponent,
    PageSizeSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RijksmuseumClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
