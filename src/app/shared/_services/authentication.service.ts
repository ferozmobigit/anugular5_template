import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../../app.config';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Token ' + JSON.parse(localStorage.getItem('currentUser')).token
    })
  };
  
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + 'users/sessions', { email: email, password: password })
            .map(user => {
                console.log(user.result)
                var usrData = user.result;
                // login successful if there's a jwt token in the response
                if (usrData && usrData.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(usrData));

                }

                return usrData;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}