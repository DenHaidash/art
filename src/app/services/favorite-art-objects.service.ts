import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ArtObjectDetails } from 'src/app/models/domain/art-object-details';
import { ArtObject } from 'src/app/models/domain/art-object';
import { PersistencyService } from 'src/app/services/persistency.service';

const favObjectsKey = 'art-fav-objects';

@Injectable()
export class FavoriteArtObjectsService {
  readonly favoritesArtObjects = new Map<string, ArtObject>();

  private favoritesUpdateSubject = new Subject<void>();
  get favoritesUpdated$(): Observable<void> {
    return this.favoritesUpdateSubject.asObservable();
  }

  constructor(private persistencyService: PersistencyService) {
    const artObjects = this.persistencyService.getData<ArtObjectDetails[]>(
      favObjectsKey
    );

    if (artObjects) {
      for (const artObject of artObjects) {
        this.addToFavorites(artObject);
      }
    }
  }

  addToFavorites(artObject: ArtObjectDetails): void {
    this.favoritesArtObjects.set(
      artObject.objectNumber,
      this.convertToArtObject(artObject)
    );

    this.onFavoritesChange();
  }

  removeFromFavorites(artObject: ArtObjectDetails | ArtObject): void {
    this.favoritesArtObjects.delete(artObject.objectNumber);

    this.onFavoritesChange();
  }

  isFavorite(artObject: ArtObjectDetails | ArtObject): boolean {
    return this.favoritesArtObjects.has(artObject.objectNumber);
  }

  getFavorites(): ArtObject[] {
    return Array.from(this.favoritesArtObjects.values());
  }

  getFavoritesCount(): number {
    return this.getFavorites().length;
  }

  private onFavoritesChange(): void {
    this.persistencyService.saveData(favObjectsKey, this.getFavorites());
    this.favoritesUpdateSubject.next();
  }

  private convertToArtObject(artObject: ArtObjectDetails): ArtObject {
    return {
      objectNumber: artObject.objectNumber,
      title: artObject.title,
      longTitle: artObject.longTitle,
      principalOrFirstMaker: artObject.principalOrFirstMaker,
      webImage: {
        url: artObject.webImage ? artObject.webImage.url : ''
      },
      headerImage: {
        url: artObject.webImage ? artObject.webImage.url : ''
      }
    };
  }
}
