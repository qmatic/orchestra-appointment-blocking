import { Logout } from './logout.service';
import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { LOGOUT_URL } from '../../app/components/containers/qm-page-header/header-navigation';
import { SPService } from '../rest/sp.service';

@Injectable()
export class AutoClose {
  private autoCloseTimeInSeconds = 0;
  private currentAutoCloseTime = 0;
  private autoCloseInterval = null;
  constructor(
    private spService: SPService,
    private logoutService: Logout
  ) {
  }

  onAutoCloseTimeExpired() {
    // this.timeslotDispatchers.deselectTimeslot();
    // const subscription = this.timeslotSelectors.selectedTime$.subscribe(
    //   timeslot => {
    //     // When timeslot is released then logout!!
    //     if (!!!timeslot) {
    //       // Logout
    //       this.logoutService.logout();
    //     }

    //     subscription.unsubscribe();
    //   }
    // );
  }

  refreshAutoClose() {
    if (this.currentAutoCloseTime > 0) {
      // console.log(
      //   `Updating autoclose timer value currentAutoCloseTime to ${this
      //     .autoCloseTimeInSeconds}`
      // );
      this.currentAutoCloseTime = this.autoCloseTimeInSeconds;
    }
  }
}
