import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { orderBy } from 'lodash';

import { QueryParams } from 'src/app/models/query-params';
import { ArtObjectListResponse } from 'src/app/models/domain/art-object-list-response';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';
import { ArtObject } from 'src/app/models/domain/art-object';
import { OrderByType } from 'src/app/models/order-by-type';

@Injectable()
export class FavoriteArtObjectsClientService {
  constructor(private favoritesService: FavoriteArtObjectsService) {}

  getCollection(params: QueryParams): Observable<ArtObjectListResponse> {
    const filteredArtObjects = this.applySearchFilters(
      this.favoritesService.getFavorites(),
      params.searchString
    );
    const sortedArtObjects = this.applySorting(
      filteredArtObjects,
      params.orderBy
    );

    return of({
      count: filteredArtObjects.length,
      artObjects: this.toPagedResult(
        sortedArtObjects,
        params.currentPage,
        params.pageSize
      )
    });
  }

  private applySearchFilters(
    artObjects: ArtObject[],
    searchString: string
  ): ArtObject[] {
    return artObjects.filter(artObject => {
      searchString = searchString.toLowerCase();

      return (
        (artObject.title || '').toLocaleLowerCase().includes(searchString) ||
        (artObject.longTitle || '')
          .toLocaleLowerCase()
          .includes(searchString) ||
        (artObject.principalOrFirstMaker || '')
          .toLowerCase()
          .includes(searchString)
      );
    });
  }

  private applySorting(
    artObjects: ArtObject[],
    orderByType: OrderByType
  ): ArtObject[] {
    switch (orderByType) {
      case OrderByType.Artist:
        return orderBy(artObjects, ['principalOrFirstMaker'], ['asc']);
      case OrderByType.ArtistDesc:
        return orderBy(artObjects, ['principalOrFirstMaker'], ['desc']);

      default:
        return artObjects;
    }
  }

  private toPagedResult(
    artObjects: ArtObject[],
    pageNumber: number,
    pageSize: number
  ): ArtObject[] {
    return artObjects.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
  }
}
