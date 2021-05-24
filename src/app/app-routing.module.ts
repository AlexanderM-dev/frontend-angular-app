import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { RegisterComponent } from './register-component/register.component';
import { AuthGuard } from './services/auth.guard';

let routes: Routes = [];

if (localStorage.getItem('token')) {
  routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'main', loadChildren: () => import('./main/main.module').then(module => module.MainModule), canActivate: [AuthGuard] }
  ];
} else {
  routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'main', loadChildren: () => import('./main/main.module').then(module => module.MainModule), canActivate: [AuthGuard] }
  ];
}



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
