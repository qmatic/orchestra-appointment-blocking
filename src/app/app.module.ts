import { Logout } from './../services/util/logout.service';
import { TimeUtils } from './../services/util/timeUtils.service';
import { QmClearInputDirective } from './directives/qm-clear-input.directive';
import { ErrorInterceptor } from './../services/util/ErrorInterceptor.service';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Moment
import { MomentModule } from 'angular2-moment';


// A11y
import { A11yModule } from '@angular/cdk/a11y';

// Ng Bootstrap, used for modals
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

// Toastr
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// NGRX Store
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Translations
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';

// Store setup
import { reducers } from '../store/reducers';
import { effects } from '../store/effects';

// Routes
import { appRoutes } from './../routes/app-routes';

// Services
import { SPService } from './../services/rest/sp.service';
import { ToastService } from './../services/util/toast.service';
import { ModalService } from './../services/util/modal.service';
import {
  storeServices,
  BranchDispatchers,
} from '../store';

// Components
import { AppComponent } from './app.component';
import { QmPageFooterComponent } from './components/presentational/qm-page-footer/qm-page-footer.component';
import { QmButtonComponent } from './components/presentational/qm-button/qm-button.component';
import { QmActionButtonComponent } from './components/presentational/qm-action-button/qm-action-button.component';
import { QmDoneModalComponent } from './components/presentational/qm-done-modal/qm-done-modal.component';

// Containers
import { QmPageHeaderComponent } from './components/containers/qm-page-header/qm-page-header.component';
import { QmMainComponent } from './components/containers/qm-main/qm-main.component';
import { QmDashboardComponent } from './components/containers/qm-dashboard/qm-dashboard.component';

// Env
import { environment } from '../environments/environment';

// Actions
import { QmInvalidLicenseComponent } from './components/presentational/qm-invalid-license/qm-invalid-license.component';
import { QmAppComponent } from './components/containers/qm-app/qm-app.component';
import { QmAppLoaderComponent } from './components/containers/qm-app-loader/qm-app-loader.component';
import { QmAppPageNotFoundComponent } from './components/presentational/qm-app-page-not-found/qm-app-page-not-found.component';
import { QmDropdownComponent } from './components/containers/qm-dropdown/qm-dropdown.component';
import { QmLoaderComponent } from './components/presentational/qm-loader/qm-loader.component';
import { QmAutofocusDirective } from './directives/qm-autofocus.directive';
import { QmBlockerListComponent } from './components/containers/qm-blocker-list/qm-blocker-list.component';
import { QmGenericModalComponent } from './components/presentational/qm-generic-modal/qm-generic-modal.component';
// tslint:disable-next-line:max-line-length
import { DatePipe } from '@angular/common';
import { CanDeactivateGuard } from '../routes/can-deactivatet';
import { QmModalComponent } from './components/presentational/qm-modal/qm-modal.component';
import { QmModalService } from './components/presentational/qm-modal/qm-modal.service';
import { QmIconItemComponent } from './components/presentational/qm-icon-item/qm-icon-item.component';
import { QmClearInputButtonComponent } from './directives/qm-clear-input-button/qm-clear-input-button.component';

import { QmMaxLengthValidatorDirective } from './directives/qm-max-length-validator.directive';
import { QmAutoCloseComponent } from './components/containers/qm-auto-close/qm-auto-close.component';
import { AutoClose } from '../services/util/autoclose.service';
import { GlobalErrorHandler } from '../services/util/global-error-handler.service';
import { QmErrorComponent } from './components/presentational/qm-error/qm-error.component';
import { QmTimeZonePipe } from './pipes/qm-time-zone.pipe';
import { QmTimeFormatPipe } from './pipes/qm-time-format.pipe';
import { QmDateFormatPipe } from './pipes/qm-date-format.pipe';

import { QmCreateBlockerModalComponent } from './components/presentational/qm-create-blocker-modal/qm-create-blocker-modal.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    // if (
    //   action.type !== '[reservation-expiry-timer] SET_RESERVATION_EXPIRY_TIME'
    // ) {
    //   console.log('state', state);
    //   console.log('action', action);
    // }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : [debug];

// Global options for Toastr
const toastrGlobalOptions = {
  maxOpened: 3,
  autoDismiss: true,
  iconClasses : {
    error: '',
    info: '',
    success: '',
    warning: '',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    QmPageFooterComponent,
    QmButtonComponent,
    QmActionButtonComponent,
    QmInvalidLicenseComponent,
    QmAppComponent,
    QmAppLoaderComponent,
    QmAppPageNotFoundComponent,
    QmPageHeaderComponent,
    QmMainComponent,
    QmDashboardComponent,
    QmDropdownComponent,
    QmLoaderComponent,
    QmAutofocusDirective,
    QmBlockerListComponent,
    QmCreateBlockerModalComponent,
    QmGenericModalComponent,
    QmModalComponent,
    QmIconItemComponent,
    QmClearInputDirective,
    QmClearInputButtonComponent,
    QmMaxLengthValidatorDirective,
    QmAutoCloseComponent,
    QmErrorComponent,
    QmTimeZonePipe,
    QmTimeFormatPipe,
    QmDateFormatPipe,
    QmDoneModalComponent
  ],
  imports: [
    MomentModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    ReactiveFormsModule,
    NgSelectModule,
    A11yModule,
    NgbModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(toastrGlobalOptions),
    ToastContainerModule,
    ...(!environment.production
      ? [StoreDevtoolsModule.instrument({ maxAge: 10 })]
      : []),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  entryComponents: [
    QmGenericModalComponent,
    QmModalComponent,
    QmClearInputButtonComponent,
    QmCreateBlockerModalComponent,
    QmDoneModalComponent
  ],
  providers: [
    QmModalService,
    SPService,
    ToastService,
    ModalService,
    TranslateService,
    ...storeServices,
    ErrorInterceptor,
    CanDeactivateGuard,
    DatePipe,
    TimeUtils,
    AutoClose,
    Logout,
    GlobalErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) {
    // No Suffix for english language file (appointmentBookingMessages.properties)
    this.translate.setDefaultLang('appointmentBlockingMessages');
    //this.router.navigate(['/loading'], { skipLocationChange: true });
  }
}
