import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, ICompany } from 'src/app/services/api.service';

export interface ISub {
  active: boolean;
  activeUntill?: string;
  wasActiveUntill?: string;
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

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
  subInfo: ISub | undefined
  = {
    active: true,
    activeUntill: '2021-11-26T21:00:00.000Z',
  };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCompanyList();
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

  addNewSub(rangeValueStart: Date, rangeValueEnd: Date): void {
    this.panelOpenState1 = false;
    console.log('adding new sub');
    console.log(rangeValueStart, rangeValueEnd);
  }

  changeSub(rangeValueStart: Date, rangeValueEnd: Date): void {
    this.panelOpenState2 = false;
    console.log('changing sub');
    console.log(rangeValueStart, rangeValueEnd);
  }

  getCompanyList(): void {
    if (this.isAdmin) {
      this.api.getAllCompaniesToAdmin()
        .subscribe({
          next: (response) => {
            this.companies = response.allCompanies;
            this.companies = this.companies.sort((a: ICompany, b: ICompany) => a.id - b.id);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  getCompanyId(id: string): void {
    this.selectedCompanyId = id;
    console.log(this.selectedCompanyId);
  }

}
