import { Logout } from './../../../../services/util/logout.service';
import { AutoClose } from './../../../../services/util/autoclose.service';
import { Subject ,  Observable ,  Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AccountSelectors, SystemInfoSelectors } from '../../../../store';
import { SPService } from '../../../../services/rest/sp.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LOGOUT,
  HOME,
  LOGOUT_URL,
  APP_URL,
  SETTINGS_URL
} from './header-navigation';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { ISystemInfo } from '../../../../models/ISystemInfo';

@Component({
  selector: 'qm-page-header',
  templateUrl: './qm-page-header.component.html',
  styleUrls: ['./qm-page-header.component.scss']
})
export class QmPageHeaderComponent implements OnInit, OnDestroy {
  brandLogoSrc = '../images/brand_logo_header.png';
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  userIsAdmin$: Observable<boolean>;
  headerSubscriptions: Subscription = new Subscription();
  isTimeSlotSelected: boolean;
  selectedTime$: Observable<string>;
  private isValidLicense$: Observable<boolean>;
  private isValidLicense: boolean;

  @Output()
  clickBackToAppointmentsPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleHeaderNavigations: EventEmitter<string> = new EventEmitter<string>();

  @Input() isPreventHeaderNavigations = false;

  constructor(
    private userSelectors: AccountSelectors,
    private spService: SPService,
    public route: ActivatedRoute,
    public qmModalService: QmModalService,
    public autoCloseService: AutoClose,
    private router: Router,
    private logoutService: Logout
  ) {
    //this.userIsAdmin$ = this.userRoleSelectors.isUserAdmin$;
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.headerSubscriptions.unsubscribe();
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutService.logout();
  }

  homeClick($event) {
    $event.preventDefault();
    window.location.href = APP_URL;
  }

  hasValidLicense(): boolean {
    return this.isValidLicense;
  }
}
