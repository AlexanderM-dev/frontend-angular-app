import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private api: ApiService,
    public dialog: MatDialog
  ) { }

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
    // cId = company Id
    localStorage.removeItem('cId');

    this.router.navigate(['/login']);
  }

  editAdminParams(): void {
    const dialogRef = this.dialog.open(EditAdminComponent, {
      height: '630px',
      width: '600px',
      maxWidth: '600px',
      minWidth: '270px',
      minHeight: '320px',
      maxHeight: '630px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './main-edit.component.html',
  styleUrls: ['./main-edit.component.scss']
})
export class EditAdminComponent {

  nameValue = '';
  surnameValue = '';
  emailValue = '';
  passValue = '';
  companyNameValue = '';
  companyInnValue = '';
  submitted = false;
  success = false;
  message = '';

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20)
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20)
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  companyNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  companyInnFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1000000),
    Validators.max(9999999)
  ]);

  constructor(
    public dialogRef: MatDialogRef<EditAdminComponent>,
    private api: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editAppAdmin(): void {

    this.submitted = true;

    this.api.editAppAdmin({
      name: this.nameFormControl.value,
      surname: this.surnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passFormControl.value,
      companyName: this.companyNameFormControl.value,
      companyInn: this.companyInnFormControl.value
    }).subscribe({
      next: (response) => {
        this.success = true;
        this.message = '';
        setTimeout(() => {
          this.submitted = false;
          this.success = false;
          this.dialogRef.close();
        }, 2000);
      },
      error: (err) => {
        this.submitted = false;
        this.success = false;
        this.message = err.error.message;
      }
    });
  }

}