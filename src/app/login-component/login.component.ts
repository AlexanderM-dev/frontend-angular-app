import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailValue = '';
  passValue = '';
  submitted = false;
  fail = false;
  message = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {

    this.submitted = true;

    this.api.login({
      email: this.emailFormControl.value,
      password: this.passFormControl.value
    }).subscribe({
      next: (response) => {
        if (response.status < 300) {
          if (response.body) {
            localStorage.removeItem('companyAdmin');
            localStorage.removeItem('isAdmin');
            if (response.body.companyAdmin) {
              localStorage.setItem('companyAdmin', String(response.body.companyAdmin));
            }

            if (response.body.isAdmin) {
              localStorage.setItem('isAdmin', String(response.body.isAdmin));
            }

            localStorage.setItem('token', response.body.token);

            this.fail = false;
            this.submitted = true;
            this.message = '';
            this.router.navigate(['/main']);
          }
        }
      },
      error: (err) => {
        this.fail = true;
        this.submitted = false;
        this.message = err.error.message;
      }
    });
  }
}
