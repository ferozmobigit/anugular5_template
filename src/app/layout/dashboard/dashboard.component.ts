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
    products: any = {};
    isadmin:boolean = false;
    role: any;

    constructor(private userService:UserService,
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService) {
        this.role = localStorage.getItem('role');
        this.isadmin = this.role=='Admin' ? true : false
        if(this.isadmin)
        {
            this.getAllPendingSignups();
        }
        else
        {
            this.getAllProducts();
            let product = new Product();
            this.products.result = [];
            product._id = "1"
            product.description="Sme desc"
            product.name = "Anti Ageing"
            product.units = 1200
            this.products.result.push(product);
        }
    }

    ngOnInit() {}

    private getAllPendingSignups() {
        this.userService.getAllPendingSignups()
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
                    // this.products = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    getAllUsersByRole() {
        switch(this.role){
            case 'Manufacturer':
                this.getUserlist('Warehouse')
            case 'Warehouse':
                this.getUserlist('Distributor')
            case 'Distributor':
                this.getUserlist('Retailer')
        }
    }
    private getUserlist(role){
        this.userService.getByRole(role)
            .subscribe(
                data => {
                    this.users = data;
                },
                error => {
                    console.log(error)
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
                    this.loading = false;
                    this.getAllPendingSignups();
                    this.alertService.success("Success");
                },
                error => {
                    this.loading = false;
                    this.getAllPendingSignups();
                    this.alertService.error(error);
                });
    }
}
