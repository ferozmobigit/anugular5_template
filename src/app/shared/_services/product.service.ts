import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../../app.config';
import { Product } from '../_models/index';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')})
};

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(appConfig.apiUrl + 'products', httpOptions);
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'products/' + _id, httpOptions);
    }

    create(product: Product) {
        console.log(product)
        return this.http.post(appConfig.apiUrl + 'products', product, httpOptions);
    }

    update(product: Product) {
        return this.http.put(appConfig.apiUrl + 'products/' + product._id, product, httpOptions);
    }

    transfer(product_info: Object) {
        return this.http.put(appConfig.apiUrl + 'products/transfer' , product_info, httpOptions);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + 'products/' + _id, httpOptions);
    }
}
