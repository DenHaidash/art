import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'art-object-tile-list',
  templateUrl: './art-object-tile-list.component.html'
})
export class ArtObjectTileListComponent implements OnDestroy {
  @Input() artObjects: any[] = [];

  @ViewChild('modal', { read: TemplateRef })
  modal: TemplateRef<any>;

  selectedArtObject: any | null = null;

  constructor(private modalService: NgbModal) {}

  openModal(obj: any): void {
    this.selectedArtObject = obj;

    this.modalService.open(this.modal, {
      centered: true,
      backdrop: 'static',
      beforeDismiss: () => {
        this.selectedArtObject = null;
        return true;
      }
    });
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
