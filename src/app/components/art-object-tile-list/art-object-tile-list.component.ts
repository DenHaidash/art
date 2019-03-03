import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtObject } from 'src/app/models/domain/art-object';

@Component({
  selector: 'art-object-tile-list',
  templateUrl: './art-object-tile-list.component.html'
})
export class ArtObjectTileListComponent implements OnDestroy {
  @Input() artObjects: ArtObject[] = [];

  @ViewChild('modal', { read: TemplateRef })
  modal: TemplateRef<ArtObject>;

  selectedArtObject: ArtObject | null = null;

  constructor(private modalService: NgbModal) {}

  openModal(artObject: ArtObject): void {
    this.selectedArtObject = artObject;

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

  artObjectIdentity(index: number, artObject: ArtObject): string {
    return artObject.objectNumber;
  }
}
