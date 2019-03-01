import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';
import { ArtObjectDetails } from 'src/app/models/domain/art-object-details';

@Component({
  selector: 'art-object-details',
  templateUrl: './art-object-details.component.html',
})
export class ArtObjectDetailsComponent implements OnInit {
  @Input() artObjectNumber: string;

  artObject$!: Observable<ArtObjectDetails>;
  hasError = false;

  constructor(private rijksmuseumClientService: RijksmuseumClientService, private favoritesService: FavoriteArtObjectsService) { }

  ngOnInit(): void {
    this.artObject$ = this.rijksmuseumClientService.getDetails(this.artObjectNumber).pipe(
      map(response => response.artObject),
      tap(() => {
        this.hasError = false;
      }, () => {
        this.hasError = true;
      })
    );
  }

  addToFavorites(artObject: ArtObjectDetails): void {
    this.favoritesService.addToFavorites(artObject);
  }

  removeFromFavorites(artObject: ArtObjectDetails): void {
    this.favoritesService.removeFromFavorites(artObject);
  }

  isFavorite(artObject: ArtObjectDetails): boolean {
    return this.favoritesService.isFavorite(artObject);
  }
}
