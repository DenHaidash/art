import { Component, Input } from '@angular/core';

import { ArtObject } from 'src/app/models/domain/art-object';

@Component({
  selector: 'art-object-tile',
  templateUrl: './art-object-tile.component.html',
  styleUrls: ['./art-object-tile.component.scss']
})
export class ArtObjectTileComponent {
  @Input() artObject: ArtObject;

  get imageUrl(): string {
    if (this.artObject.headerImage) {
      return this.artObject.headerImage.url;
    }

    return this.artObject.webImage.url;
  }
}
