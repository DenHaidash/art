import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'art-details-page',
  templateUrl: './details-page.component.html'
})
export class DetailsPageComponent {
  artObject: any;

  constructor(activedRoute: ActivatedRoute) {
    this.artObject = activedRoute.snapshot.data['artObject'];
  }
}
