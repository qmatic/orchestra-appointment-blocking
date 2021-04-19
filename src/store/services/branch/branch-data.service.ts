import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBranchResponse } from '../../../models/IBranchResponse';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { calendarEndpoint } from '../data.service';

@Injectable()
export class BranchDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getBranches(): Observable<any> {
    return this.http
      .get<IBranchResponse>(`${calendarEndpoint}/branches/`)
      .pipe(catchError(this.errorHandler.handleError()));
  }
}
