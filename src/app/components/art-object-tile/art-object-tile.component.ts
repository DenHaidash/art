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
    return this.artObject.headerImage.url;
  }
}
