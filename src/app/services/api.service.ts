import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IRegisterCompanyAdmin {
  name: string;
  surname: string;
  email: string;
  password: string;
  companyName: string;
  companyInn: string;
}

export interface IRegisterCompanyUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  companyAdmin: boolean;
  isAdmin: boolean;
}

export interface IProduct {
  id: number;
  name: string;
}

export interface IProductNew {
  name: string;
}

export interface IStandartResponse {
  message: string;
}

export interface ICompany {
  id: number;
  name: string;
  inn: string;
}

export interface ISubCheckResponse {
  id: number;
  active: boolean;
  activeUntill?: string;
  wasActiveUntill?: string;
}

export interface ISubscription {
  startDate: string;
  endDate: string;
  companyId: string;
  productId: string;
}

export interface ISubscriptionChange {
  startDate: string;
  endDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  productIdValue$: BehaviorSubject<number | boolean> = new BehaviorSubject<number | boolean>(false);

  token = localStorage.getItem('token');

  constructor(public http: HttpClient) { }

// Auth
  login(user: ILogin): Observable<HttpResponse<ILoginResponse>> {
    return this.http.post<ILoginResponse>('http://localhost:3000/api/v1.1.0/auth/login', user,
      { observe: 'response' });
  }

  registerCompanyAdmin(companyAdmin: IRegisterCompanyAdmin): Observable<HttpResponse<IStandartResponse>> {
    return this.http.post<IStandartResponse>('http://localhost:3000/api/v1.1.0/auth/register', companyAdmin,
      { observe: 'response' });
  }

  registerCompanyUser(companyUser: IRegisterCompanyUser): Observable<HttpResponse<IStandartResponse>> {
    return this.http.post<IStandartResponse>('http://localhost:3000/api/v1.1.0/auth/registeruser', companyUser,
      { observe: 'response' });
  }

// Products
  getAllProductsToAdmin(): Observable<{ allProducts: IProduct[] }> {
    return this.http.get<{ allProducts: IProduct[] }>('http://localhost:3000/api/v1.1.0/product');
  }

  addNewProduct(product: IProductNew): Observable<IStandartResponse> {
    return this.http.post<IStandartResponse>('http://localhost:3000/api/v1.1.0/product', product);
  }

  changeProduct(product: IProductNew, id: number): Observable<IStandartResponse> {
    return this.http.put<IStandartResponse>(`http://localhost:3000/api/v1.1.0/product/${id}`, product);
  }

  deleteProduct(id: number): Observable<IStandartResponse> {
    return this.http.delete<IStandartResponse>(`http://localhost:3000/api/v1.1.0/product/${id}`);
  }

// Companies
  getAllCompaniesToAdmin(): Observable<{ allCompanies: ICompany[] }> {
    return this.http.get<{ allCompanies: ICompany[] }>('http://localhost:3000/api/v1.1.0/company');
  }

// Subscription
  checkSubscriptionByAdmin(productId: string, companyId: string): Observable<ISubCheckResponse> {
    return this.http.get<ISubCheckResponse>(`http://localhost:3000/api/v1.1.0/subscription/admin?productId=${productId}&companyId=${companyId}`);
  }

  checkSubscription(productId: string): Observable<ISubCheckResponse> {
    return this.http.get<ISubCheckResponse>(`http://localhost:3000/api/v1.1.0/subscription/?productId=${productId}`);
  }

  addSubscription(newSub: ISubscription): Observable<IStandartResponse> {
    return this.http.post<IStandartResponse>('http://localhost:3000/api/v1.1.0/subscription', newSub)
  }

  changeSubscription(newSubValue: ISubscriptionChange, subId: number): Observable<IStandartResponse> {
    return this.http.put<IStandartResponse>(`http://localhost:3000/api/v1.1.0/subscription/${subId}`, newSubValue);
  }

  deleteSubscription(subId: number): Observable<IStandartResponse> {
    return this.http.delete<IStandartResponse>(`http://localhost:3000/api/v1.1.0/subscription/${subId}`);
  }

}
