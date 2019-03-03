import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { QueryParams } from 'src/app/models/query-params';
import { ArtObjectListResponse } from 'src/app/models/domain/art-object-list-response';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';

@Injectable()
export class FavoriteArtObjectsClientService {
  constructor(private favoritesService: FavoriteArtObjectsService) {}

  getCollection(params: QueryParams): Observable<ArtObjectListResponse> {
    const filteredArtObjects = this.favoritesService
      .getFavorites()
      .filter(artObject => {
        const searchString = params.searchString.toLowerCase();

        return (
          (artObject.title || '').toLocaleLowerCase().includes(searchString) ||
          (artObject.longTitle || '')
            .toLocaleLowerCase()
            .includes(searchString) ||
          (artObject.description || '')
            .toLocaleLowerCase()
            .includes(searchString)
        );
      });

    const sortedArtObjects = filteredArtObjects; // not implemented

    const pagedArtObjects = sortedArtObjects.slice(
      params.currentPage - 1 * params.pageSize,
      params.currentPage * params.pageSize - 1
    );

    return of({
      count: filteredArtObjects.length,
      artObjects: pagedArtObjects
    });
  }
}
