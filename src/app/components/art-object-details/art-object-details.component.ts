import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';

@Component({
  selector: 'art-object-details',
  templateUrl: './art-object-details.component.html',
})
export class ArtObjectDetailsComponent implements OnInit {
  @Input() artObjectNumber: string;

  artObject$!: Observable<any>;
  hasError = false;

  constructor(private rijksmuseumClientService: RijksmuseumClientService) { }

  ngOnInit(): void {
    this.artObject$ = this.rijksmuseumClientService.getDetails(this.artObjectNumber).pipe(
      map(response => response.artObject),
      tap(() => {
        this.hasError = false;
      }, () => {
        this.hasError = true;
      })
    );
  }
}
