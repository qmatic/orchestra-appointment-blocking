import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import {
  AccountSelectors, SystemInfoSelectors
} from '../../../../store/index';
import { ToastService } from '../../../../services/util/toast.service';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { APP_URL } from '../qm-page-header/header-navigation';


declare global {
  interface Window { SYSTEM_DATE_FORMAT: any; }
}

//window.SYSTEM_DATE_FORMAT = "YY-MM-DD" || {};

@Component({
  selector: 'qm-qm-app',
  templateUrl: './qm-app.component.html',
  styleUrls: ['./qm-app.component.scss']
})
export class QmAppComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  private subscriptions: Subscription = new Subscription();
  isLoaded = false;

  constructor(
    private accountSelectors: AccountSelectors,
    private toastService: ToastService,
    private toastrService: ToastrService,
    private qmModalService: QmModalService,
    private systemInfoSelector: SystemInfoSelectors
  ) {
    this.userFullName$ = this.accountSelectors.userFullName$;
    this.userDirection$ = this.accountSelectors.userDirection$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);

    const blockerListLoadedSubscription = this.accountSelectors.isLoaded$.subscribe(
      (val: boolean) => {
        this.isLoaded = val;
    });
    this.subscriptions.add(blockerListLoadedSubscription);

    const accountSubscription = this.accountSelectors.access$.subscribe(
      (val: boolean) => {
        if (!val && this.isLoaded){
          this.showAccessModal();
        }
    });
    this.subscriptions.add(accountSubscription);

    const systemInfoDateSubscription = this.systemInfoSelector.dateConvention$.subscribe(
      (val: string) => {
        if (val.length > 0) {
          window.SYSTEM_DATE_FORMAT = val;
        }
      }
    );
  }

  showAccessModal() {
    const modal = this.qmModalService.openDoneModal('label.invalid.access.header', 'label.invalid.access.message');
    modal.result.then((value)=> {
      if(value) {
        window.location.href = APP_URL;
        //this.handleHeaderNavigations.emit(HOME);
        //this.onNotesChanged.emit(value);
      }
    });
  }
}
