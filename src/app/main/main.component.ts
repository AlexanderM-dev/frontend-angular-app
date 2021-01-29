import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  companyAdmin = localStorage.getItem('companyAdmin');
  isAdmin = localStorage.getItem('isAdmin');

  selectedProductId: number | boolean = false;

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.selectedProductId = false;
    this.api.productIdValue$.subscribe(id => {
      this.selectedProductId = id;
    })
  }

  ngOnDestroy(): void {
    this.selectedProductId = false;
    this.api.productIdValue$.next(false);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('companyAdmin');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
  }

}
