import { Component, OnDestroy } from '@angular/core';
import { RijksmuseumClientService } from 'src/app/services/rijksmuseum-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, takeUntil, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'art-main-page',
    templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnDestroy {
    results: any;

    requestParams = new FormGroup({
        currentPage: new FormControl(1),
        pageSize: new FormControl(20),
        searchString: new FormControl(''),
        orderBy: new FormControl('relevance')
    });

    isLoading = true;
    hasError = false;

    get hasResults(): boolean {
        return this.results && this.results.artObjects && this.results.artObjects.length > 0;
    }

    get totalPages(): number {
        if (this.hasResults) {
            const estimatedPageQuantity = Math.ceil(this.results.count / this.requestParams.controls.pageSize.value);

            const maxAllowedResultsNumber = 10000;
            const maxAllowedPageNumber = Math.floor(maxAllowedResultsNumber / this.requestParams.controls.pageSize.value);
            return Math.min(estimatedPageQuantity, maxAllowedPageNumber);
        }

        return 0;
    }

    private componentDestroyedSubject = new Subject<boolean>();
    private componentDestroyed$: Observable<boolean>;

    constructor(private rijksmuseumClient: RijksmuseumClientService) {
        this.componentDestroyed$ = this.componentDestroyedSubject.asObservable();

        this.requestParams.valueChanges.pipe(
            takeUntil(this.componentDestroyed$),
            debounceTime(200),
            tap(() => {
                this.isLoading = true;
                this.hasError = false;
            }),
            switchMap(params => this.rijksmuseumClient.getCollection(params)),
            tap(() => {
                this.isLoading = false;
            }),
        ).subscribe(results => {
            this.results = results;
        }, () => {
            this.hasError = true;
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

    onPageSizeChange(pageSize: number): void {
        this.requestParams.patchValue({
            currentPage: 1,
            pageSize
        });
    }

    ngOnDestroy(): void {
        this.componentDestroyedSubject.next(true);
    }
}
