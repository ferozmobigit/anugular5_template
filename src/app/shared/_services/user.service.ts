import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../../app.config';
import { User } from '../_models/index';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token')
  })
};

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        // console.log(localStorage.getItem('currentUser'));
        return this.http.get<User[]>(appConfig.apiUrl + 'users', httpOptions);
    }
    getAllPendingSignups(){
        return this.http.get<User[]>(appConfig.apiUrl + 'users/?status=Pending', httpOptions);
    }
    getRoles() {
        return this.http.get(appConfig.apiUrl + 'roles');
    }

    getUserRoles() {
        return this.http.get<User[]>(appConfig.apiUrl + 'users', httpOptions);
    }

    getByRole(role) {
        return this.http.get<User[]>(appConfig.apiUrl + 'users/list/'+role, httpOptions);
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'users/' + _id, httpOptions);
    }

    create(user: User) {
        console.log(user)
        return this.http.post(appConfig.apiUrl + 'users', user);
    }

    approve_signup(_id: string, isApproved: boolean){
        if(isApproved===true){
            return this.http.post(appConfig.apiUrl + 'users/' + _id + '/approve_signup', {}, httpOptions);        
        }else{
            return this.http.post(appConfig.apiUrl + 'users/' + _id + '/reject_signup', {}, httpOptions);        
        }
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + 'users/' + user._id, user, httpOptions);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + 'users/' + _id, httpOptions);
    }
}
