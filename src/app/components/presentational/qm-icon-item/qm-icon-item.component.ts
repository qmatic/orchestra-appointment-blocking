import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSelectors } from '../../../../store';

@Component({
  selector: 'qm-icon-item',
  templateUrl: './qm-icon-item.component.html',
  styleUrls: ['./qm-icon-item.component.scss']
})
export class QmIconItemComponent implements OnInit {
  public userDirection$: Observable<string>;

  @Input()
  icon = '';

  @Input()
  text = '';

  constructor(
    private accountSelector: AccountSelectors
  ) {
    this.userDirection$ = this.accountSelector.userDirection$;
  }

  ngOnInit() {
  }

}
