import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { SearchPipe } from '../services/search.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterUserComponent } from './register-user/register-user.component';
import { InterceptorService } from '../services/interceptor.service';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
};

@NgModule({
  declarations: [
    MainComponent,
    ProductListComponent,
    SubscriptionComponent,
    RegisterUserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild([
      { path: '', component: MainComponent }
    ])
  ],
  providers: [INTERCEPTOR_PROVIDER]
})
export class MainModule { }
