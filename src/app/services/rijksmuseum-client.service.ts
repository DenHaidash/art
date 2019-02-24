import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class RijksmuseumClientService {
    constructor(private httpClient: HttpClient) {}

    getCollection(pageNumber: number, pageSize: number = 25): Observable<any> {
        return this.httpClient.get(`${this.getBaseUrl()}/collection?${this.prepareQueryParams({
            p: pageNumber,
            ps: pageSize
        })}`);
    }

    getDetails(id: string): Observable<any> {
        return this.httpClient.get(`${this.getBaseUrl()}/collection/${id}?${this.prepareQueryParams()}`);
    }

    private getBaseUrl(): string {
        return `${environment.rijksmuseumApiCongif.baseUrl}/api/${environment.rijksmuseumApiCongif.culture}`;
    }

    private prepareQueryParams(options: any = {}): string {
        options = options || {};
        const params = Object.keys(options).reduce((acc, key) => `${acc}&${key}=${options[key]}`, '');
        return `key=${environment.rijksmuseumApiCongif.apiKey}&format=json&imgonly=${environment.rijksmuseumApiCongif.withImageOnly}${params}`;
    }
}