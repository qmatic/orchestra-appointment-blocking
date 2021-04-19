import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/Rx';

import { IAccount } from './../../../models/IAccount';
import { restEndpoint, DataServiceError } from './../data.service';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import 'rxjs/Rx';

export const APPOINTMENT_BLOCKING_ROLE = 'appointmentblocking';
export const APPOINTMENT_ROLE = 'appointment';
export const ENTRYPOINT_ROLE = 'entryPoint';
export const CALENDAR_ROLE = 'calendar-admin';
export const SUPER_ADMIN_ROLE = '*';

@Injectable()
export class AccountDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getAccountInfo(): Observable<{ data: IAccount; canAccess: boolean }  | any> {
    return this.http
      .get<IAccount>(`${restEndpoint}/account`)
      .pipe(map((res: IAccount) => {
        let userCanAccess = false;
        if (res.modules.includes(SUPER_ADMIN_ROLE) || (res.modules.includes(APPOINTMENT_BLOCKING_ROLE)
        && res.modules.includes(APPOINTMENT_ROLE) && res.modules.includes(ENTRYPOINT_ROLE))) {
          userCanAccess = true;
        }
        // Remove boolean value(rtl or not) from the local
        res.locale = res.locale && res.locale.split(':')[0];

        return { data: res, canAccess: userCanAccess };
      }))
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
