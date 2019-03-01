import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  NgbPaginationModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainPageComponent } from './components/pages/main/main-page.component';
import { DetailsPageComponent } from './components/pages/details/details-page.component';
import { RijksmuseumClientService } from './services/rijksmuseum-client.service';
import { ArtObjectTileListComponent } from './components/art-object-tile-list/art-object-tile-list.component';
import { ArtObjectTileComponent } from './components/art-object-tile/art-object-tile.component';
import { SearchBarComponent } from './components/pages/main/search-bar/search-bar.component';
import { OrderBySelectorComponent } from './components/pages/main/order-by-selector/order-by-selector.component';
import { PageSizeSelectorComponent } from './components/pages/main/page-size-selector/page-size-selector.component';
import { ArtObjectDetailsComponent } from './components/art-object-details/art-object-details.component';
import { ArtObjectExtendedDetailsComponent } from './components/art-object-extended-details/art-object-extended-details.component';
import { ArtObjectResolver } from './routing/resolvers/art-object.resolver';
import { ArtObjectListResolver } from './routing/resolvers/art-object-list.resolver';
import { FavoriteArtObjectsService } from './services/favorite-art-objects.service';
import { PersistencyService } from './services/persistency.service';
import { FavoriteArtObjectsClientService } from './services/favorite-art-object-client.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DetailsPageComponent,
    ArtObjectDetailsComponent,
    ArtObjectExtendedDetailsComponent,
    ArtObjectTileComponent,
    ArtObjectTileListComponent,
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
  providers: [
    RijksmuseumClientService,
    FavoriteArtObjectsService,
    FavoriteArtObjectsClientService,
    PersistencyService,
    ArtObjectResolver,
    ArtObjectListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
