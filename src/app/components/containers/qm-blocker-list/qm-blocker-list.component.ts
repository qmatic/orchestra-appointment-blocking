import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { AccountSelectors, BlockerDispatchers, BlockerSelectors } from '../../../../store/index';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IBlocker } from '../../../../models/IBlocker';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { ModalService } from '../../../../services/util/modal.service';

@Component({
  selector: 'qm-blocker-list',
  templateUrl: './qm-blocker-list.component.html',
  styleUrls: ['./qm-blocker-list.component.scss'],
})
export class QmBlockerListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  public blockerList: IBlocker[] = [];

  public userDirection: string;

  displayedColumns: string[] = ['id', 'title', 'branch', 'start', 'end', 'created', 'updated', 'action'];
  dataSource: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private dashboardHeight = 600;
  public dashboardRowCSSHeight = '600px';
  private dashboardRemains = 88;

  constructor(
    private accountSelectors: AccountSelectors,
    private blockerSelectors: BlockerSelectors,
    private blockerDispatcher: BlockerDispatchers,
    private qmModalService: QmModalService,
    private modalService: ModalService,
  ) {
    this.userDirection$ = this.accountSelectors.userDirection$;
  }

  @ViewChild('myDiv') theDiv:ElementRef;
  ngAfterContentChecked() {
    let elem = document.getElementById('dashboard-body');
    
      let elemHight = elem.clientHeight;
      if (elemHight !== this.dashboardHeight && elemHight > this.dashboardRemains) {
        this.dashboardHeight = elemHight;
        this.dashboardRowCSSHeight = (elemHight - this.dashboardRemains - 8) + 'px';
    
      }
  }

  ngOnInit() {

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const blockerListSubscription = this.blockerSelectors.blockers$.subscribe(
      (list: IBlocker[]) => {
        this.blockerList = list;
        //if (list.length > 0){
          this.dataSource = new MatTableDataSource(this.blockerList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'title': return (item as IBlocker).title.toLowerCase();
              case 'branch': return (item as IBlocker).branch && (item as IBlocker).branch.name.toLowerCase();
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;
        //}

        if (list.length > 0){
          this.dataSource.filterPredicate = (data: IBlocker, filter: string) => {
            return data.title.toLowerCase().includes(filter) || data.id.toString().includes(filter) || (data.branch && data.branch.name.toLowerCase().includes(filter)) || (data.branch === null && 'global'.includes(filter)) ;
           };
        }
      }
    );

    this.subscriptions.add(blockerListSubscription);
    this.subscriptions.add(userDirectionSubscription);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSearchChange(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBlocker(blockerData: IBlocker) {
    this.modalService.openCreateBlockerModal(false, blockerData);
  }

  deleteBlocker(blocker) {
    this.qmModalService.openForTransKeys(
      'label.deleteBlockerModal.headline',
      '',
      'button.deleteBlockerModal.cancel',
      'button.deleteBlockerModal.ok',
      (cancelClicked: Boolean) => {
        if (!cancelClicked) {
          this.blockerDispatcher.deleteBlocker(blocker);
        }
      },
      () => {
      });
  }
}
