import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { OrderByType } from 'src/app/models/order-by-type';
import { ArtObjectListResponse } from 'src/app/models/domain/art-object-list-response';
import { QueryParams } from 'src/app/models/query-params';
import { FavoriteArtObjectsClientService } from 'src/app/services/favorite-art-object-client.service';

export const defaultQueryParams: QueryParams = {
  currentPage: 1,
  pageSize: 20,
  searchString: '',
  orderBy: OrderByType.Relevance
};

@Injectable()
export class ArtObjectListResolver
  implements Resolve<Observable<ArtObjectListResponse>> {
  constructor(
    private rijksmuseumClientService: RijksmuseumClientService,
    private favoriteArtObjectsClientService: FavoriteArtObjectsClientService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ArtObjectListResponse> {
    window.scrollTo(0, 0);

    const params = Object.assign({}, defaultQueryParams, route.queryParams);

    if (route.data.onlyFavorites) {
      return this.favoriteArtObjectsClientService.getCollection(params);
    }

    return this.rijksmuseumClientService.getCollection(params);
  }
}
