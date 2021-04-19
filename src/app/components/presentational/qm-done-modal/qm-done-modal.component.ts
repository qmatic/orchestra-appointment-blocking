import { Observable, Subject, Subscription } from 'rxjs';
import { AccountSelectors } from '../../../../store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'qm-done-modal',
  templateUrl: './qm-done-modal.component.html',
  styleUrls: ['./qm-done-modal.component.scss']
})
export class QmDoneModalComponent implements OnInit, OnDestroy {

  heading: string = '';
  subHeading: string = '';

  userDirection$: Observable<string>;
  userDirection: string;
  subscriptions: Subscription  = new Subscription();
  isAutoCloseModal: boolean;
  autoCloseTimer = null;
  skipBranchFocus: boolean;
  skipButtonHover: boolean;
  mousePressed: boolean;

  constructor(public activeModal: NgbActiveModal,
    private userSelectors: AccountSelectors) { }

  ngOnInit() {
    this.userDirection$ = this.userSelectors.userDirection$;
    const userSubscription = this.userDirection$.subscribe((ud) => {
      this.userDirection = ud;
    });

    this.subscriptions.add(userSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goBackHome() {
    this.activeModal.close(true);
  }
}
