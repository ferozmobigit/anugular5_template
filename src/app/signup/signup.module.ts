import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { AlertModule } from '../shared/_directives/alert.module';
import { AlertService, AuthenticationService, UserService } from '../shared/_services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SignupRoutingModule,
    AlertModule
  ],
  declarations: [SignupComponent],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
],
})
export class SignupModule { }
