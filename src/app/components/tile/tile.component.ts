import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'art-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
    @Input() object: any = {};

    constructor() { }

    ngOnInit(): void { }
}
