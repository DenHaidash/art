import { Component, Input } from "@angular/core";

@Component({
  selector: "art-tiles-list",
  templateUrl: "./tiles-list.component.html"
})
export class TilesListComponent {
  @Input() objects: any[] = [];
}
