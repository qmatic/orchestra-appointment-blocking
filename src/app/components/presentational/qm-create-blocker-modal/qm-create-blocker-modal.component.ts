
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { Subscription ,  Observable } from 'rxjs';

import { AccountSelectors, BlockerDispatchers, BlockerSelectors, BranchSelectors, SystemInfoSelectors } from '../../../../store';
import { whiteSpaceValidator, validateNotEqualToFactory } from '../../../util/custom-form-validators';
import { AutoClose } from '../../../../services/util/autoclose.service';
import { IBranch } from '../../../../models/IBranch';
import { IBlocker } from '../../../../models/IBlocker';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

console.log(window.SYSTEM_DATE_FORMAT)
const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: window.SYSTEM_DATE_FORMAT,
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export class CustomDateFormats {
  constructor() {}
  get display() {
    return {
          dateInput: window.SYSTEM_DATE_FORMAT,
          monthYearLabel: "YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "YYYY"
        };
  }
  get parse() {
    return {
          dateInput: window.SYSTEM_DATE_FORMAT
        };
  }
}

@Component({
  selector: 'qm-create-blocker-modal',
  templateUrl: './qm-create-blocker-modal.component.html',
  styleUrls: ['./qm-create-blocker-modal.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useClass: CustomDateFormats},
  ],
})
export class QmCreateBlockerModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  createBlockerForm: FormGroup;
  public branches: NgOption[] = [];
  @ViewChild('pickerStart') pickerStart: any;
  @ViewChild('pickerEnd') pickerEnd: any;

  userBranchIds: number[];
  isBlock: boolean;
  blockerData: IBlocker;
  public date: moment.Moment;
  public disabled = false;
  public enableMeridian = false;
  public minStartDate;
  public minEndDate;
  public stepMinute = 5;
  public color: ThemePalette = 'primary';

  constructor(
    @Inject(MAT_DATE_FORMATS) private config: CustomDateFormats,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private userSelectors: AccountSelectors,
    private translateService: TranslateService,
    public autoCloseService: AutoClose,
    private branchSelectors: BranchSelectors,
    private blockerDispatcher: BlockerDispatchers,
    private systemInfoSelector: SystemInfoSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
  }

  ngOnInit() {
    let currentCustomerSubscription = null;
    if (currentCustomerSubscription) {
      this.subscriptions.add(currentCustomerSubscription);
    }

    const userAccountSubscription = this.userSelectors.branchIds$.subscribe(
      (list: number[]) => {
        this.userBranchIds = list;
      }
    );

    const branchSubscription = this.branchSelectors.branches$.subscribe(
      (list: IBranch[]) => {
        if(list.length > 0) {
          this.branches = list as NgOption[];
          //this.branches = this.filterBranch(list) as NgOption[];
        }
      }
    );

    const systemInfoSubscription = this.systemInfoSelector.timeConvention$.subscribe(
      (val: string) => {
        if (val !== '24') {
          this.enableMeridian = false
        } else {
          this.enableMeridian = true;
        }
      }
    );

    this.subscriptions.add(userAccountSubscription);
    this.subscriptions.add(branchSubscription);
    this.subscriptions.add(systemInfoSubscription);

    this.buildCustomerForm();
    this.setDefaultTime();
    if (this.blockerData) {
      this.setBlockerData();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setDefaultTime() {
    let currentTime = new Date();
    this.createBlockerForm.controls['startTime'].setValue({hour : currentTime.getHours(), minute : currentTime.getMinutes()});
    this.createBlockerForm.controls['endTime'].setValue({hour : currentTime.getHours(), minute : currentTime.getMinutes()});
  }

  setBlockerData() {
    const startDateObj = new Date(this.blockerData.start);
    const endDateObj = new Date(this.blockerData.end);
    this.createBlockerForm.controls['title'].setValue(this.blockerData.title);
    this.createBlockerForm.controls['notes'].setValue(this.blockerData.notes);
    this.createBlockerForm.controls['branch'].setValue(this.blockerData.branch.id);
    this.createBlockerForm.controls['startDate'].setValue(startDateObj);
    this.createBlockerForm.controls['startTime'].setValue({hour : startDateObj.getHours(), minute : startDateObj.getMinutes()});
    this.createBlockerForm.controls['endDate'].setValue(endDateObj);
    this.createBlockerForm.controls['endTime'].setValue({hour : endDateObj.getHours(), minute : endDateObj.getMinutes()});
  }

// Build customer form
  buildCustomerForm() {

    this.createBlockerForm = this.fb.group({
      title: ['', Validators.required, whiteSpaceValidator],
      notes: [''],
      branch: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  onDateChange() {
    const formModel = this.createBlockerForm.value;
    this.minEndDate = formModel.startDate;
    let dateNow = new Date();
    if (formModel.startDate.format('YYYY-MM-DD') !== moment(dateNow).format('YYYY-MM-DD')) {
      this.createBlockerForm.controls['startTime'].setValue({hour : 0, minute : 0});
      this.createBlockerForm.controls['endTime'].setValue({hour : 23, minute : 59});
    } else {
      this.createBlockerForm.controls['startTime'].setValue({hour : dateNow.getHours(), minute : dateNow.getMinutes()});
      this.createBlockerForm.controls['endTime'].setValue({hour : 23, minute : 59});
    }
  }

// Submitting
  onSubmit() {
    const formModel = this.createBlockerForm.value;
    const startDateObj = formModel.startDate.format('YYYY-MM-DD');
    const endDateObj = formModel.endDate.format('YYYY-MM-DD');
  
    let blockItem = {
      title : formModel.title as string,
      notes : formModel.notes as string,
      branch : formModel.branch,
      start : startDateObj + 'T' + 
      (formModel.startTime.hour < 10 ? ('0' + formModel.startTime.hour) : formModel.startTime.hour) + ':' + 
      (formModel.startTime.minute < 10 ? ('0' + formModel.startTime.minute) : formModel.startTime.minute) + ':00',
      end : endDateObj + 'T' + 
      (formModel.endTime.hour < 10 ? ('0' + formModel.endTime.hour) : formModel.endTime.hour) + ':' + 
      (formModel.endTime.minute < 10 ? ('0' + formModel.endTime.minute) : formModel.endTime.minute) + ':00'
    } as IBlocker;

    if (this.blockerData) {
      let newBlockerObj = JSON.parse(JSON.stringify(this.blockerData));
      
      newBlockerObj.title = formModel.title as string;
      newBlockerObj.notes = formModel.notes as string;
      newBlockerObj.branch = formModel.branch;
      newBlockerObj.start = startDateObj + 'T' + 
        (formModel.startTime.hour < 10 ? ('0' + formModel.startTime.hour) : formModel.startTime.hour) + ':' + 
        (formModel.startTime.minute < 10 ? ('0' + formModel.startTime.minute) : formModel.startTime.minute) + ':00';
      newBlockerObj.end = endDateObj + 'T' + 
        (formModel.endTime.hour < 10 ? ('0' + formModel.endTime.hour) : formModel.endTime.hour) + ':' + 
        (formModel.endTime.minute < 10 ? ('0' + formModel.endTime.minute) : formModel.endTime.minute) + ':00';
        this.blockerDispatcher.updateBlocker(newBlockerObj as IBlocker);
      }
      else {
        this.blockerDispatcher.setBlocker(blockItem);
      }
    
    this.activeModal.close();
  }

  filterBranch(branches) {
    const result = branches.filter(branchObj => this.userBranchIds.includes(branchObj.id) || branchObj.id === 0);
    return result
  }

  get title() {
    return this.createBlockerForm.get('title');
  }
  get notes() {
    return this.createBlockerForm.get('notes');
  }
  get branch() {
    return this.createBlockerForm.get('branch');
  }
  get startTime() {
    return this.createBlockerForm.get('startTime');
  }
  get startDate() {
    return this.createBlockerForm.get('startDate');
  }
  get endDate() {
    return this.createBlockerForm.get('endDate');
  }
  get endTime() {
    return this.createBlockerForm.get('endTime');
  }
}
