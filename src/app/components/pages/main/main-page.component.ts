import { Component, OnInit } from '@angular/core';
import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';

@Component({
    selector: 'art-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
    objects: any[] = [];

    constructor(private rijksmuseumClient: RijksmuseumClientService) { 
        this.rijksmuseumClient.getCollection(0).subscribe(objects => {
            this.objects = objects.artObjects;
        })
    }

    ngOnInit(): void { }
}
