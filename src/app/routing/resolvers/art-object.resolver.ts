import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { ArtObjectDetails } from 'src/app/models/domain/art-object-details';

@Injectable()
export class ArtObjectResolver implements Resolve<Observable<ArtObjectDetails>> {
  constructor(private rijksmuseumClientService: RijksmuseumClientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ArtObjectDetails> {
    return this.rijksmuseumClientService.getDetails(route.paramMap.get('id')).pipe(
      map(response => response.artObject)
    );
  }
}
