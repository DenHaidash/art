import { Injectable } from '@angular/core';
import { QueryParams } from '../models/query-params';
import { ArtObjectListResponse } from '../models/domain/art-object-list-response';
import { Observable, of } from 'rxjs';
import { FavoriteArtObjectsService } from './favorite-art-objects.service';

@Injectable()
export class FavoriteArtObjectsClientService {
  constructor(private favoritesService: FavoriteArtObjectsService) {}

  getCollection(params: QueryParams): Observable<ArtObjectListResponse> {
    let filteredArtObjects = this.favoritesService.getFavorites().filter(artObject => {
      const searchString = params.searchString.toLowerCase();

      return (artObject.title || '').toLocaleLowerCase().includes(searchString)
        || (artObject.longTitle || '').toLocaleLowerCase().includes(searchString)
        || (artObject.description || '').toLocaleLowerCase().includes(searchString);
    });

    let sortedArtObjects = filteredArtObjects; // not implemented

    let pagedArtObjects = sortedArtObjects.slice((params.currentPage - 1 * params.pageSize), params.currentPage * params.pageSize - 1);

    return of({
      count: filteredArtObjects.length,
      artObjects: pagedArtObjects
    });
  }
}