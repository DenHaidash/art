import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-object-extended-details',
  templateUrl: './art-object-extended-details.component.html',
})
export class ArtObjectExtendedDetailsComponent implements OnInit {
  @Input() artObject: any | null;

  constructor() { }

  ngOnInit(): void { }
}
