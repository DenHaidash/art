import { Component, Input, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'art-tiles-list',
  templateUrl: './tiles-list.component.html'
})
export class TilesListComponent implements OnDestroy {
  @Input() objects: any[] = [];

  @ViewChild('modal', { read: TemplateRef })
  modal: TemplateRef<any>;

  selectedObject: any | null = null;

  constructor(private modalService: NgbModal) {}

  openModal(obj: any): void {
      this.selectedObject = obj;

      this.modalService.open(this.modal, {
        centered: true,
        backdrop: 'static',
        beforeDismiss: () => {
            this.selectedObject = null;
            return true;
        }
    });
  }

  ngOnDestroy(): void {
      this.modalService.dismissAll();
  }
}
