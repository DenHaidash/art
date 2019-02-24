import { Component, OnInit } from '@angular/core';
import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, share, tap, shareReplay, startWith } from 'rxjs/operators';


@Component({
    selector: 'art-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent {
    results: any;

    requestParams = new FormGroup({
        currentPage: new FormControl(1),
        pageSize: new FormControl(20),
        searchQuery: new FormControl(''),
        orderBy: new FormControl()
    });

    isLoading = true;

    get hasResults(): boolean {
        return this.results && this.results.artObjects && this.results.artObjects.length > 0;
    }

    constructor(private rijksmuseumClient: RijksmuseumClientService) {         
        this.requestParams.valueChanges.pipe(
            tap(() => {
                this.isLoading = true;
            }),
            switchMap(params => this.rijksmuseumClient.getCollection(params.currentPage, params.pageSize)),
            tap(() => {
                this.isLoading = false;
            }),
        ).subscribe(results => {
            this.results = results;
        });

        this.requestParams.updateValueAndValidity({
            emitEvent: true,
            onlySelf: false
        });
    }

    onPageChange(pageNum: number): void {
        this.requestParams.patchValue({
            currentPage: pageNum
        });
    }
}
