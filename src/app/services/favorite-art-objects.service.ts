import { ArtObjectDetails } from '../models/domain/art-object-details';
import { Injectable } from '@angular/core';
import { PersistencyService } from './persistency.service';
import { Subject, Observable } from 'rxjs';

const favObjectsKey = 'art-fav-objects';

@Injectable()
export class FavoriteArtObjectsService {
  readonly favoritesArtObjects = new Map<string, ArtObjectDetails>();

  private favoritesUpdateSubject = new Subject<void>();
  get favoritesUpdated$(): Observable<void> {
    return this.favoritesUpdateSubject.asObservable();
  }

  constructor(private persistencyService: PersistencyService) {
    const artObjects = this.persistencyService.getData<ArtObjectDetails[]>(favObjectsKey);

    if (artObjects) {
      for (const artObject of artObjects) {
        this.addToFavorites(artObject);
      }
    }
  }

  addToFavorites(artObject: ArtObjectDetails): void {
    this.favoritesArtObjects.set(artObject.objectNumber, artObject);

    this.onFavoritesChange();
  }

  removeFromFavorites(artObject: ArtObjectDetails): void {
    this.favoritesArtObjects.delete(artObject.objectNumber);

    this.onFavoritesChange();
  }

  isFavorite(artObject: ArtObjectDetails): boolean {
    return this.favoritesArtObjects.has(artObject.objectNumber);
  }

  getFavorites(): ArtObjectDetails[] {
    return Array.from(this.favoritesArtObjects.values());
  }

  getFavoritesCount(): number {
    return this.getFavorites().length;
  }

  private onFavoritesChange(): void {
    this.persistencyService.saveData(favObjectsKey, this.getFavorites());
    this.favoritesUpdateSubject.next();
  }
}