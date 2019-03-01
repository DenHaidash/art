import { Component, Input } from '@angular/core';
import { ArtObjectDetails } from 'src/app/models/domain/art-object-details';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';

@Component({
  selector: 'art-object-extended-details',
  templateUrl: './art-object-extended-details.component.html',
})
export class ArtObjectExtendedDetailsComponent {
  @Input() artObject: ArtObjectDetails | undefined;

  constructor(private favoritesService: FavoriteArtObjectsService) {}

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
