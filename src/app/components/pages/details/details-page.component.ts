import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtObjectDetails } from 'src/app/models/domain/art-object-details';

@Component({
  selector: 'art-details-page',
  templateUrl: './details-page.component.html'
})
export class DetailsPageComponent {
  artObject: ArtObjectDetails;

  constructor(activedRoute: ActivatedRoute) {
    this.artObject = activedRoute.snapshot.data.artObject;
  }
}
