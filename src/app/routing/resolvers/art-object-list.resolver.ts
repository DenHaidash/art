import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { OrderByType } from 'src/app/models/order-by-type';

export const defaultQueryParams = {
  currentPage: 1,
  pageSize: 20,
  searchString: '',
  orderBy: OrderByType.Relevance
};

@Injectable()
export class ArtObjectListResolver implements Resolve<Observable<any>> {
  constructor(private rijksmuseumClientService: RijksmuseumClientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    window.scrollTo(0, 0);

    const params = Object.assign({}, defaultQueryParams, route.queryParams);
    return this.rijksmuseumClientService.getCollection(params);
  };
}