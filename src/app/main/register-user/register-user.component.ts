import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  nameValue = '';
  surnameValue = '';
  emailValue = '';
  passValue = '';
  success = false;
  fail = false;
  submitted = false;
  panelOpenState = false;
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
    this.success = false;
    this.fail = false;
    this.message = '';
    this.clearInputs();
  }

  clearInputs(): void {
    this.nameFormControl.setValue('');
    this.surnameFormControl.setValue('');
    this.emailFormControl.setValue('');
    this.passFormControl.setValue('');
    this.nameFormControl.markAsUntouched();
    this.surnameFormControl.markAsUntouched();
    this.emailFormControl.markAsUntouched();
    this.passFormControl.markAsUntouched();
  }

  registerCompanyAdmin(): void {

    this.submitted = true;

    this.api.registerCompanyUser({
      name: this.nameFormControl.value,
      surname: this.surnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passFormControl.value
    }).subscribe({
      next: (response) => {
        this.fail = false;
        this.success = true;
        this.message = '';
        this.clearInputs();
        setTimeout(() => {
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
