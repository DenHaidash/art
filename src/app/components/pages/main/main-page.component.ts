import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { defaultQueryParams } from 'src/app/routing/resolvers/art-object-list.resolver';

@Component({
  selector: 'art-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnDestroy {
  artObjectList: any;

  readonly requestParams: FormGroup;

  isLoading = false;
  hasError = false;

  get hasResults(): boolean {
    return (
      this.artObjectList &&
      this.artObjectList.artObjects &&
      this.artObjectList.artObjects.length > 0
    );
  }

  get totalPages(): number {
    if (this.hasResults) {
      const estimatedPageQuantity = Math.ceil(
        this.artObjectList.count / this.requestParams.controls.pageSize.value
      );

      const maxAllowedResultsNumber = 10000;
      const maxAllowedPageNumber = Math.floor(
        maxAllowedResultsNumber / this.requestParams.controls.pageSize.value
      );
      return Math.min(estimatedPageQuantity, maxAllowedPageNumber);
    }

    return 0;
  }

  private readonly componentDestroyedSubject = new Subject<boolean>();
  private readonly componentDestroyed$: Observable<boolean>;

  constructor(router: Router, activetedRoute: ActivatedRoute) {
    this.requestParams = new FormGroup({
      currentPage: new FormControl(defaultQueryParams.currentPage),
      pageSize: new FormControl(defaultQueryParams.pageSize),
      searchString: new FormControl(defaultQueryParams.searchString),
      orderBy: new FormControl(defaultQueryParams.orderBy)
    });

    this.componentDestroyed$ = this.componentDestroyedSubject.asObservable();

    this.requestParams.patchValue(activetedRoute.snapshot.queryParams, {
      emitEvent: false
    });

    activetedRoute.data
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ artObjectList }: { artObjectList: any }) => {
        this.artObjectList = artObjectList;
      });

    this.requestParams.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(params => {
        router.navigate(['/'], {
          queryParams: this.shrinkQueryParams(params)
        });
      });
  }

  private shrinkQueryParams(queryParams: any): any {
    return Object.keys(queryParams)
      .filter(key => queryParams[key])
      .reduce((params, key) => {
        params[key] = queryParams[key];
        return params;
      }, {});
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

  onSearchStringChange(searchString: string): void {
    this.requestParams.patchValue({
      currentPage: 1,
      searchString
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyedSubject.next(true);
  }
}
