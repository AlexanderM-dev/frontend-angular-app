import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, ICompany, ISubCheckResponse } from 'src/app/services/api.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  panelOpenState1 = false;
  panelOpenState2 = false;

  isAdmin = localStorage.getItem('isAdmin');

  // название компании, которое соответсвует компании зашедшего пользователя
  companyName = 'Some Company Name';

  // массив компаний, получать с сервера
  companies: ICompany[] = [];

  // айди выбранной компаниии
  selectedCompanyId = '';

  // статус подписки и дата окончания
  subInfo: ISubCheckResponse | undefined

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.getCompanyList();
      this.api.productIdValue$.subscribe(() => {
        this.selectedCompanyId = '';
      })
    }
  }

  ngOnDestroy() {
    this.selectedCompanyId = '';
    this.companies = [];
    this.companyName = '';
    this.subInfo = undefined;
  }

  togglePanelAdd(): void {
    this.panelOpenState2 = false;
    this.panelOpenState1 = !this.panelOpenState1;
  }

  togglePanelChange(): void {
    this.panelOpenState1 = false;
    this.panelOpenState2 = !this.panelOpenState2;
  }

  clearDateRange(): void {
    this.range.setValue({
      start: null,
      end: null
    });
  }

  validateDate(date: Date) {
    const year = `${date.getFullYear()}`;
    let mounth = `${date.getMonth()+1}`;
    let day = `${date.getDate()}`;
    if (+mounth < 10) {
      mounth = `0${date.getMonth()+1}`
    }
    if (+day < 10) {
      day = `0${date.getDate()}`
    }
    return `${year}-${mounth}-${day}`
  };

  getCompanyList(): void {
    if (this.isAdmin) {
      this.api.getAllCompaniesToAdmin()
        .subscribe({
          next: (response) => {
            this.companies = response.allCompanies;
            this.companies = this.companies.sort((a: ICompany, b: ICompany) => a.id - b.id);
            // по нулевому индексу компания администратора, поэтому убираем её из массива компаний
            this.companies.splice(0, 1)
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  getSubInfo(companyId: string): void {
    this.panelOpenState2 = false;
    this.panelOpenState1 = false;
    this.selectedCompanyId = companyId;
    const productId = String(this.api.productIdValue$.getValue());
    this.api.checkSubscriptionByAdmin(productId, companyId)
    .subscribe({
      next: (response) => {
        this.subInfo = response; 
      },
      error: (err) => {
        console.log(err.error.message);
        this.subInfo = undefined;
      }
    });
     
  }

  addNewSub(rangeValueStart: Date, rangeValueEnd: Date): void {
    this.panelOpenState1 = false;
    const productId = String(this.api.productIdValue$.getValue());
        
    this.api.addSubscription({
      startDate: this.validateDate(rangeValueStart),
      endDate: this.validateDate(rangeValueEnd),
      companyId: this.selectedCompanyId,
      productId: productId
    }).subscribe({
      next: (response) => {
        this.getSubInfo(this.selectedCompanyId)
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }

  changeSub(rangeValueStart: Date, rangeValueEnd: Date): void {
    this.panelOpenState2 = false;

    if (this.subInfo) {
      this.api.changeSubscription({
        startDate: this.validateDate(rangeValueStart),
        endDate: this.validateDate(rangeValueEnd)
      }, this.subInfo.id).subscribe({
        next: (response) => {
          this.getSubInfo(this.selectedCompanyId)
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  deleteSub(): void {
    if (this.subInfo) {
      this.api.deleteSubscription(this.subInfo.id).subscribe({
        next: (response) => {
          this.getSubInfo(this.selectedCompanyId)
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
