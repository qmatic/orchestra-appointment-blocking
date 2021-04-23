import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import * as BlockerActions from '../actions';
import { BlockerDataService, DataServiceError } from '../services';
import * as AllActions from './../actions';
import { ToastService } from '../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';

const toAction = AllActions.toAction();

@Injectable()
export class BlockerEffects {
  constructor(
    private actions$: Actions,
    private blockerDataService: BlockerDataService,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) { }

  @Effect()
  getBlockers$: Observable<Action> = this.actions$
    .pipe(
      ofType(BlockerActions.FETCH_BLOCKERS),
      switchMap((action: BlockerActions.FetchBlockers) =>
        toAction(
          this.blockerDataService.getBlockers(action.payload),
          BlockerActions.FetchBlockersSuccess,
          BlockerActions.FetchBlockersFail
        )
      )
    );

  @Effect()
  setBlocker$: Observable<Action> = this.actions$
    .pipe(
      ofType(BlockerActions.SET_BLOCKER),
      switchMap((action: BlockerActions.SetBlocker) =>
        toAction(
          this.blockerDataService.setBlocker(action.payload),
          BlockerActions.SetBlockerSuccess,
          BlockerActions.SetBlockerFail
        )
      )
    );

  @Effect()
  setBlockerSuccess$: Observable<Action> = this.actions$
      .pipe(
        ofType(BlockerActions.SET_BLOCKER_SUCCESS),
        tap((action: BlockerActions.SetBlockerSuccess) =>
          this.translateService.get('label.create.blocker.success', { title : action.payload.title}).subscribe(
            (label: string) => this.toastService.successToast(`${label}`)
          ).unsubscribe()
        ),
        switchMap((action: BlockerActions.SetBlockerSuccess) =>
        []
      )
      );

      @Effect()
      setBlockerFail$: Observable<Action> = this.actions$
          .pipe(
            ofType(BlockerActions.SET_BLOCKER_FAIL),
            tap((action: BlockerActions.SetBlockerFail) => {
              if (action.payload['errorCode'] === "E100") {
                this.translateService.get('label.create.blocker.fail.E100').subscribe(
                  (label: string) => this.toastService.errorToast(`${label}`)
                ).unsubscribe()
              } else if (action.payload['responseData']['status'] === 0) {
                this.translateService.get('label.delete.blocker.fail').subscribe(
                  (label: string) => this.toastService.errorToast(`${label}`)
                ).unsubscribe()
              } else if (action.payload['responseData']['error']['code'] === 'error.cannot.create.appointment.start.after.end') {
                this.translateService.get('label.error.start.after.end').subscribe(
                  (label: string) => this.toastService.errorToast(`${label}`)
                ).unsubscribe()
              } else if (action.payload['responseData']['error']['code'] === 'error.cannot.create.appointment.past') {
                this.translateService.get('label.error.start.before.now').subscribe(
                  (label: string) => this.toastService.errorToast(`${label}`)
                ).unsubscribe()
              } else {
                this.toastService.errorToast(action.payload['responseData']['error']['msg'] as string)
              }
            }
            ),
            switchMap((action: BlockerActions.SetBlockerFail) =>
            []
          )
          );

      @Effect()
      updateBlocker$: Observable<Action> = this.actions$
        .pipe(
          ofType(BlockerActions.UPDATE_BLOCKER),
          switchMap((action: BlockerActions.UpdateBlocker) =>
            this.blockerDataService.updateBlocker(action.payload).pipe(
              mergeMap(() => [new BlockerActions.UpdateBlockerSuccess(action.payload)]),
              catchError((err: DataServiceError<any>) => of(new BlockerActions.UpdateBlockerFail(err))),
            )
          )
        );
    
        @Effect()
        updateBlockerSuccess$: Observable<Action> = this.actions$
            .pipe(
              ofType(BlockerActions.UPDATE_BLOCKER_SUCCESS),
              tap((action: BlockerActions.UpdateBlockerSuccess) =>
                this.translateService.get('label.update.blocker.success', { title : action.payload.title}).subscribe(
                  (label: string) => this.toastService.successToast(`${label}`)
                ).unsubscribe()
              ),
              switchMap((action: BlockerActions.UpdateBlockerSuccess) =>
              []
            )
            );
        @Effect()
            updateBlockerFail$: Observable<Action> = this.actions$
                .pipe(
                  ofType(BlockerActions.UPDATE_BLOCKER_FAIL),
                  tap((action: BlockerActions.UpdateBlockerFail) =>
                  this.toastService.errorToast(action.payload['responseData']['error']['msg'] as string)
                  ),
                  switchMap((action: BlockerActions.UpdateBlockerFail) =>
                  []
                )
                );

  @Effect()
  deleteBlocker$: Observable<Action> = this.actions$
    .pipe(
      ofType(BlockerActions.DELETE_BLOCKER),
      switchMap((action: BlockerActions.DeleteBlocker) =>
        this.blockerDataService.deleteBlocker(action.payload).pipe(
          mergeMap(() => [new BlockerActions.DeleteBlockerSuccess(action.payload)]),
          catchError((err: DataServiceError<any>) => of(new BlockerActions.DeleteBlockerFail(err))),
        )
      )
    );

    @Effect()
    deleteBlockerSuccess$: Observable<Action> = this.actions$
        .pipe(
          ofType(BlockerActions.DELETE_BLOCKER_SUCCESS),
          tap((action: BlockerActions.DeleteBlockerSuccess) =>
            this.translateService.get('label.delete.blocker.success', { title : action.payload.title}).subscribe(
              (label: string) => this.toastService.successToast(`${label}`)
            ).unsubscribe()
          ),
          switchMap((action: BlockerActions.DeleteBlockerSuccess) =>
          []
        )
        );

        @Effect()
      deleteBlockerFail$: Observable<Action> = this.actions$
          .pipe(
            ofType(BlockerActions.DELETE_BLOCKER_FAIL),
            tap((action: BlockerActions.DeleteBlockerFail) => {
              if (action.payload['responseData']['status'] === 404 || action.payload['responseData']['status'] === 0) {
                this.translateService.get('label.delete.blocker.fail').subscribe(
                  (label: string) => this.toastService.errorToast(`${label}`)
                ).unsubscribe()
              } else {
                this.toastService.errorToast(action.payload['responseData']['error']['msg'] as string)
              }
            }
            ),
            switchMap((action: BlockerActions.DeleteBlockerFail) =>
            []
          )
          );
}
