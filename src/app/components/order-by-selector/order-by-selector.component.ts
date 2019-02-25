import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'art-order-by-selector',
  templateUrl: './order-by-selector.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: OrderBySelectorComponent,
    multi: true
  }]
})
export class OrderBySelectorComponent implements OnDestroy, ControlValueAccessor {
  private componentDestroyedSubject = new Subject<boolean>();
  private componentDestroyed$: Observable<boolean>;

  orderControl = new FormControl();

  constructor() {
    this.componentDestroyed$ = this.componentDestroyedSubject.asObservable();
    this.orderControl.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe((orderBy) => {
      this.onChange(orderBy);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyedSubject.next(true);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(orderBy: string): void {
    this.orderControl.setValue(orderBy);
  }
}
