import { Component, Input } from "@angular/core";

@Component({
  selector: "art-tile",
  templateUrl: "./tile.component.html",
  styleUrls: ["./tile.component.scss"]
})
export class TileComponent {
  @Input() object: any = {};
}
