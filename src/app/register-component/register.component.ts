import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nameValue = '';
  surnameValue = '';
  emailValue = '';
  passValue = '';
  companyNameValue = '';
  companyInnValue = '';
  submitted = false;
  success = false;
  fail = false;
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
  ])
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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  registerCompanyAdmin(): void {

    this.submitted = true;

    this.api.registerCompanyAdmin({
      name: this.nameFormControl.value,
      surname: this.surnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passFormControl.value,
      companyName: this.companyNameFormControl.value,
      companyInn: this.companyInnFormControl.value
    }).subscribe({
      next: (response) => {
        this.fail = false;
        this.success = true;
        this.message = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.submitted = false;
          this.success = false;
        }, 2000);
      },
      error: (err) => {
        this.submitted = false;
        this.success = false;
        this.fail = true;
        this.message = err.error.message;
      }
    });
  }

}

