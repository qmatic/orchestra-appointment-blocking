import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastContainerDirective } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';
// import * as locales from 'moment/min/locales';

import { IBranch } from './../models/IBranch';
import {
  BranchDispatchers,
  SystemInfoDispatchers,
  AccountDispatchers,
  AccountSelectors,
  BlockerDispatchers
} from '../store';
import { ToastService } from '../services/util/toast.service';

@Component({
  selector: 'qm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userDirection$: Observable<string>;
  userLocale$: Observable<string>;

  constructor(
    private accountSelectors: AccountSelectors,
    private branchDispatchers: BranchDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private accountDispatchers: AccountDispatchers,
    private blockerDispatchers: BlockerDispatchers,
    private http: HttpClient
  ) {
    this.userDirection$ = this.accountSelectors.userDirection$;
    this.userLocale$ = this.accountSelectors.userLocale$;
  }

  ngOnInit() {
    this.accountDispatchers.fetchAccountInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.branchDispatchers.fetchBranches();
    this.blockerDispatchers.fetchBlockers('custom=BLOCKED');

    // Set up locale of user
    this.userLocale$.subscribe(locale => {
      moment.locale(locale);
    });
  }
}
