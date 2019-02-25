import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'art-page-size-selector',
  templateUrl: './page-size-selector.component.html',
  styleUrls: ['./page-size-selector.component.scss']
})
export class PageSizeSelectorComponent {
  @Input() pageSizes: number[] = [];
  @Input() selectedPageSize: number | undefined;

  @Output() pageSizeChange = new EventEmitter<number>();

  onSelect(pageSize: number): void {
    this.pageSizeChange.emit(pageSize);
  }
}
