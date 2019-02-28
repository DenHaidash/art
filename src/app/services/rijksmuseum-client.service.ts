import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class RijksmuseumClientService {
  private artObjectsCache = new Map();

  constructor(private httpClient: HttpClient) {}

  getCollection(params: any): Observable<any> {
    return this.httpClient.get(
      `${this.getBaseUrl()}/collection?${this.prepareQueryParams({
        p: params.currentPage,
        ps: params.pageSize,
        s: params.orderBy,
        q: params.searchString
      })}`
    ).pipe(
        share()
    );
  }

  getDetails(id: string, bypassCache = false): Observable<any> {
    if (!bypassCache && this.artObjectsCache.has(id)) {
        return of(this.artObjectsCache.get(id));
    }

    return this.httpClient.get(
      `${this.getBaseUrl()}/collection/${id}?${this.prepareQueryParams()}`
    ).pipe(
        tap((artObject: any) => {
            this.artObjectsCache.set(id, artObject);
        }),
        share()
    );
  }

  private getBaseUrl(): string {
    return `${environment.rijksmuseumApiCongif.baseUrl}/api/${
      environment.rijksmuseumApiCongif.culture
    }`;
  }

  private prepareQueryParams(options: any = {}): string {
    options = options || {};
    const params = Object.keys(options).reduce(
      (acc, key) => `${acc}&${key}=${options[key]}`,
      ''
    );
    return `key=${
      environment.rijksmuseumApiCongif.apiKey
    }&format=json&imgonly=${
      environment.rijksmuseumApiCongif.withImageOnly
    }${params}`;
  }
}
