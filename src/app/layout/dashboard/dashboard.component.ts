import { Component, OnInit, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService,UserService,ProductService } from '../../shared';
import { Product } from '../../shared/index';
import {ProductTrackDialogComponent, ProductTransferDialogComponent} from '../product/product.component'
import { MatDialog} from '@angular/material';

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
    show_transfer: boolean = false;
    role: any;
    product_details: any;
    transfer_product_info:any;
    transferTo: any = {};
    private dialogRef: any;
    
    constructor(private userService:UserService,
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService, 
        private dialog: MatDialog) {
            this.role = localStorage.getItem('role');
            this.isadmin = this.role=='Admin' ? true : false
            if(this.isadmin)
            {
                this.getAllPendingSignups();
            }
            else
            {
                this.getAllProducts();
                // let product = new Product();
                // this.products.result = [];
                // product._id = "1"
                // product.description="Sme desc"
                // product.name = "Anti Ageing"
                // product.units = 1200
                // this.products.result.push(product);
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
                    this.products = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }
    showTransferProductModal(role, product_data){
        let taransferUsers;
        switch(this.role){
            case 'Manufacturer':
                taransferUsers = 'Warehouse'
            case 'Warehouse':
                taransferUsers='Distributor'
            case 'Distributor':
                taransferUsers = 'Retailer'
        }
        this.userService.getByRole(role)
            .subscribe(
                data => {
                    let dialog = this.dialog.open(ProductTransferDialogComponent, {
                        width: '600px',
                        height: '500px',
                        data: { 
                            available_users: data,
                            product_details: product_data
                            }
                        });
                        dialog.afterClosed().subscribe(result => {
                        console.log('The dialog was closed');
                        });
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

    getProductDetails(id: string){
        this.loading = true;
        this.productService.getById(id)
            .subscribe(
                data => {
                    this.product_details = data
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    transfer(){
        this.productService.transfer(this.transfer_product_info)
            .subscribe(
                data => {
                    this.alertService.success('Product Transfered', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    showDetailsDialog(drug_data){
        this.dialogRef = this.dialog.open(ProductTrackDialogComponent,{
            width: '600px',
            height: '500px',
            data: {   
                      product_details: drug_data,
                      manufacture_status : 'complete',
                      warehouse_status : 'active',
                      distributor_status : 'disabled',
                      retailer_status : 'disabled'
                  }
          });
        // this.transferTo = this.getUserlist(role);
        // this.show_transfer = true;
    }
}
