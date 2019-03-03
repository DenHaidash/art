import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  NgbPaginationModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/routing/app-routing.module';
import { AppComponent } from 'src/app/components/app/app.component';
import { MainPageComponent } from 'src/app/components/pages/main/main-page.component';
import { DetailsPageComponent } from 'src/app/components/pages/details/details-page.component';
import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { ArtObjectTileListComponent } from 'src/app/components/art-object-tile-list/art-object-tile-list.component';
import { ArtObjectTileComponent } from 'src/app/components/art-object-tile/art-object-tile.component';
import { SearchBarComponent } from 'src/app/components/pages/main/search-bar/search-bar.component';
import { OrderBySelectorComponent } from 'src/app/components/pages/main/order-by-selector/order-by-selector.component';
import { PageSizeSelectorComponent } from 'src/app/components/pages/main/page-size-selector/page-size-selector.component';
import { ArtObjectDetailsComponent } from 'src/app/components/art-object-details/art-object-details.component';
import { ArtObjectExtendedDetailsComponent } from 'src/app/components/art-object-extended-details/art-object-extended-details.component';
import { ArtObjectResolver } from 'src/app/routing/resolvers/art-object.resolver';
import { ArtObjectListResolver } from 'src/app/routing/resolvers/art-object-list.resolver';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';
import { PersistencyService } from 'src/app/services/persistency.service';
import { FavoriteArtObjectsClientService } from 'src/app/services/favorite-art-object-client.service';

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
