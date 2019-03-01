import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { defaultQueryParams } from 'src/app/routing/resolvers/art-object-list.resolver';
import { ArtObjectListResponse } from 'src/app/models/domain/art-object-list-response';
import { QueryParams } from 'src/app/models/query-params';
import { FavoriteArtObjectsService } from 'src/app/services/favorite-art-objects.service';

@Component({
  selector: 'art-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnDestroy {
  artObjectList: ArtObjectListResponse;

  readonly requestParams: FormGroup;

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

  get isFavoritesMode(): boolean {
    return this.activetedRoute.snapshot.data.onlyFavorites;
  }

  private readonly componentDestroyedSubject = new Subject<boolean>();
  private readonly componentDestroyed$: Observable<boolean>;

  get favoritesCount(): number {
      return this.favoritesService.getFavoritesCount();
  }

  constructor(router: Router, private activetedRoute: ActivatedRoute, private favoritesService: FavoriteArtObjectsService) {
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
      .subscribe(({ artObjectList }: { artObjectList: ArtObjectListResponse }) => {
        this.artObjectList = artObjectList;
      });

    this.requestParams.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(params => {
        router.navigate([activetedRoute.routeConfig.path], {
          queryParams: this.shrinkQueryParams(params)
        });
      });

    this.favoritesService.favoritesUpdated$
        .pipe(
            takeUntil(this.componentDestroyed$),
            filter(() => activetedRoute.snapshot.data.onlyFavorites)
        )
        .subscribe(() => {
            router.navigate([activetedRoute.routeConfig.path], {
                queryParams: activetedRoute.snapshot.queryParamMap
            });
        })  
  }

  private shrinkQueryParams(queryParams: QueryParams): Partial<QueryParams> {
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
