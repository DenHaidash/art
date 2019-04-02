import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ArtObjectListResponse } from 'src/app/models/domain/art-object-list-response';
import { ArtObjectDetailsResponse } from 'src/app/models/domain/art-object-details-response';
import { QueryParams } from 'src/app/models/query-params';

@Injectable()
export class RijksmuseumClientService {
  private artObjectsCache = new Map<string, ArtObjectDetailsResponse>();

  constructor(private httpClient: HttpClient) {}

  getCollection(params: QueryParams): Observable<ArtObjectListResponse> {
    return this.httpClient.get<ArtObjectListResponse>(
      `${this.getBaseUrl()}/collection`,
      {
        params: this.prepareQueryParams({
          p: params.currentPage,
          ps: params.pageSize,
          s: params.orderBy,
          q: params.searchString
        })
      }
    ).pipe(
        share()
    );
  }

  getDetails(id: string, bypassCache = false): Observable<ArtObjectDetailsResponse> {
    if (!bypassCache && this.artObjectsCache.has(id)) {
        return of(this.artObjectsCache.get(id));
    }

    return this.httpClient.get<ArtObjectDetailsResponse>(
      `${this.getBaseUrl()}/collection/${id}`,
      {
        params: this.prepareQueryParams()
      }
    ).pipe(
        tap((artObject: ArtObjectDetailsResponse) => {
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

  private prepareQueryParams(options: Partial<QueryParams> | {} = {}): HttpParams {
    const params = new HttpParams()
      .set('key', environment.rijksmuseumApiCongif.apiKey)
      .set('format', 'json')
      .set('imgonly', environment.rijksmuseumApiCongif.withImageOnly.toString());

    return Object.entries(options)
      .reduce((params: HttpParams, [key, value]: [string, string|number]) => params.set(key, value.toString()), params);
  }
}
