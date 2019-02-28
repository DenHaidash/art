import { Component, Input } from '@angular/core';

@Component({
  selector: 'art-object-tile',
  templateUrl: './art-object-tile.component.html',
  styleUrls: ['./art-object-tile.component.scss']
})
export class ArtObjectTileComponent {
  @Input() artObject: any = {};
}
