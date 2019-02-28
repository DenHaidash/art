import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';

@Injectable()
export class ArtObjectResolver implements Resolve<Observable<any>> {
  constructor(private rijksmuseumClientService: RijksmuseumClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.rijksmuseumClientService.getDetails(route.paramMap.get('id')).pipe(
      map(response => response.artObject),
    );
  };
}