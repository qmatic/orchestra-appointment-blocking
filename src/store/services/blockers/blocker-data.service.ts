import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint } from '../data.service';
import { IBlockerResponse } from '../../../models/IBlockerResponse';
import { IBlocker } from '../../../models/IBlocker';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { IBranch } from '../../../models/IBranch';


@Injectable()
export class BlockerDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) { }

  getBlockers(search: string): Observable<IBlockerResponse> {
    return this.http
      .get<IBlockerResponse>(`${calendarEndpoint}/appointments/search?custom=BLOCKED`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  deleteBlocker(blocker: IBlocker) {
    return this.http
      .delete(`${calendarEndpoint}/appointments/${blocker.id}`)
      .pipe(catchError(this.errorHandler.handleError()));
  }

  setBlocker(blocker: IBlocker) {
    var reqBody = {
      'custom': 'BLOCKED',
      'blocking': 'true',
      'title': blocker.title,
      'allDay': 'false',
      'start': blocker.start,
      'end': blocker.end
    };
    if (blocker.branch) {
      reqBody['branch'] = { 'id': blocker.branch }
    }
    
    return this.http
      .post
      (`${calendarEndpoint}/appointments`,
        reqBody)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }

  updateBlocker(blocker: IBlocker) {
    
    var reqBody = blocker;
    // if (blocker.branch) {
    //   reqBody['branch'] = { 'id': blocker.branch } as IBranch
    // }
    
    return this.http
      .put
      (`${calendarEndpoint}/appointments/${blocker.id}`,
        reqBody)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
}
