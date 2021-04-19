import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { IBlocker } from '../../../../models/IBlocker';
import { AccountSelectors, BlockerSelectors } from '../../../../store/index';
import { ModalService } from '../../../../services/util/modal.service';
import { QmBlockerListComponent } from '../qm-blocker-list/qm-blocker-list.component';
@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  public userDirection$: Observable<string>;
  private subscriptions: Subscription = new Subscription();
  searchText: string;
  blockerListSource: IBlocker[];
  isLoaded = false;

  @ViewChild (QmBlockerListComponent) blockerList:QmBlockerListComponent;

  constructor(
    private _elRef:ElementRef,
    private userSelectors: AccountSelectors,
    private modalService: ModalService,
    private blockerSelectors: BlockerSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {

    const blockerListLoadedSubscription = this.blockerSelectors.isLoaded$.subscribe(
      (val: boolean) => {
        this.isLoaded = val;
    });
    this.subscriptions.add(blockerListLoadedSubscription);

    const blockerCreateSubscription = this.blockerSelectors.hasError$.subscribe(
      (val: any) => {
        if (this.blockerListSource && this.blockerListSource.length === 0 && this.isLoaded && val) {
          let _thisObj = this;
          setTimeout(function(){
            _thisObj.openCreateBlocker(true);
          }, 4000); 
        }
      }
    );
    this.subscriptions.add(blockerCreateSubscription);

    const blockerListSubscription = this.blockerSelectors.blockers$.subscribe(
      (list: IBlocker[]) => {
        this.blockerListSource = list;
        if (list.length === 0 && this.isLoaded) {
          this.openCreateBlocker(true);
        }
      });
      this.subscriptions.add(blockerListSubscription);
  }

  openCreateBlocker(isBlock: boolean) {
    this.modalService.openCreateBlockerModal(isBlock, null);

  }

  printBlockerList() {
    window.print();
  }

  ngOnDestroy() {
    //this.subscriptions.unsubscribe();
  }

  onTextChange(value) {
    this.blockerList.onSearchChange(value);
  }
}
