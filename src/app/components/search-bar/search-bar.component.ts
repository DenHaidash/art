import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'art-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchBarComponent,
    multi: true
  }]
})
export class SearchBarComponent implements ControlValueAccessor {
  searchString = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(searchString: string): void {
    this.searchString = searchString;
  }

  onSubmit(): void {
    this.onChange(this.searchString);
  }
}
