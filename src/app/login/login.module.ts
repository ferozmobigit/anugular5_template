import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AlertService, AuthenticationService, UserService } from '../shared/_services/index';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule],
    declarations: [LoginComponent],
    providers: [
      AlertService,
      AuthenticationService,
      UserService,
  ],
})
export class LoginModule {}
