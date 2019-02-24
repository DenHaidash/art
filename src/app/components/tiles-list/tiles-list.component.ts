import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'art-tiles-list',
    templateUrl: './tiles-list.component.html',
})
export class TilesListComponent implements OnInit {
    @Input() objects: any[] = [];

    constructor() { }

    ngOnInit(): void { }
}
