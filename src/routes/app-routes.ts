// tslint:disable-next-line:max-line-length
import { QmErrorComponent } from './../app/components/presentational/qm-error/qm-error.component';
import { CanDeactivateGuard } from './can-deactivatet';
import { QmAppPageNotFoundComponent } from './../app/components/presentational/qm-app-page-not-found/qm-app-page-not-found.component';
import { QmAppLoaderComponent } from './../app/components/containers/qm-app-loader/qm-app-loader.component'
import { QmAppComponent } from './../app/components/containers/qm-app/qm-app.component';
import { QmInvalidLicenseComponent } from './../app/components/presentational/qm-invalid-license/qm-invalid-license.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  { path: 'loading', component: QmAppLoaderComponent },
  { path: 'app', component: QmAppComponent },
  { path: 'invalid-license', component: QmInvalidLicenseComponent },
  { path: 'error', component: QmErrorComponent },
  { path: '**', component: QmAppPageNotFoundComponent },
];
