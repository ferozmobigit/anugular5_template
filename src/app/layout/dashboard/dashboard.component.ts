import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService,UserService,ProductService } from '../../shared';
import { Product } from '../../shared/index';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    users: Array<any> = [];
    loading = false;
    products: Product[];
    isadmin:boolean = false;

    constructor(private userService:UserService,
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService) {
        let role = localStorage.getItem('role');
        this.isadmin = role=='admin' ? true : false
        if(this.isadmin)
        {
            this.getAllUsers();
        }
        else
        {
            this.getAllUsers();
        }
    }

    ngOnInit() {}

    private getAllUsers() {
        this.userService.getAll()
            .subscribe(
                data => {
                    this.users = data;
                },
                error => {
                    console.log(error)
                });
    }

    private getAllProducts(){
        this.productService.getAll()
            .subscribe(
                data => {
                    this.products = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    user_approval(_id: string, isApproved: boolean) {
        this.loading = true;
        this.userService.approve_signup(_id, isApproved)
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.loading = false;
                });
    }
}
