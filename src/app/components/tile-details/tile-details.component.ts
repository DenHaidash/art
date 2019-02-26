import { Component, OnInit, Input } from '@angular/core';
import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'art-tile-details',
  templateUrl: './tile-details.component.html',
})
export class TileDetailsComponent implements OnInit {
  @Input() objectNumber: string;

  object$!: Observable<any>;
  hasError = false;

  constructor(private rijksmuseumClientService: RijksmuseumClientService) { }

  ngOnInit(): void {
    this.object$ = this.rijksmuseumClientService.getDetails(this.objectNumber).pipe(
      map(response => response.artObject),
      tap(() => {
        this.hasError = false;
      }, () => {
        this.hasError = true;
      })
    );
  }
}
