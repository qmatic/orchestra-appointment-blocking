import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QmGenericModalComponent } from '../../app/components/presentational/qm-generic-modal/qm-generic-modal.component';
import { QmCreateBlockerModalComponent } from '../../app/components/presentational/qm-create-blocker-modal/qm-create-blocker-modal.component';
import { IBlocker } from './../../models/IBlocker';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openCreateBlockerModal(isBlock: boolean, data: IBlocker) {
    const modal = this.modalService.open(QmCreateBlockerModalComponent, { centered: true, beforeDismiss: () => {
      return !isBlock;
    } });
    modal.componentInstance.isBlock = isBlock;
    modal.componentInstance.blockerData = data;
  }
}
