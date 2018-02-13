import { Component, OnInit, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService,UserService,ProductService } from '../../shared';
import { Product } from '../../shared/index';
import {ProductTrackDialogComponent, ProductTransferDialogComponent, ProductRecieveDialogComponent} from '../product/product.component'
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
                    console.log(data);
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
        this.product_details = product_data;
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
                        this.transfer(result, this.product_details.id);
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

    transfer(toAddress, product_id){
        this.transfer_product_info.to_address = toAddress;
        this.productService.transfer(this.transfer_product_info, product_id)
            .subscribe(
                data => {
                    this.alertService.success('Product Transfered', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    recieve(id){
        this.productService.recieve(id)
        .subscribe(
            data => {
                this.getAllProducts();
                this.alertService.success('Product Recieved', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    showDetailsDialog(drug_data){
        this.productService.trace(drug_data._id)
            .subscribe(
                data => {
                    let trace_details = data
                    // this.loading = false;
                    this.dialogRef = this.dialog.open(ProductTrackDialogComponent,{
                        width: '600px',
                        height: '500px',
                        data: {   
                                  product_details: trace_details,
                                  manufacture_status : 'complete',
                                  warehouse_status : 'active',
                                  distributor_status : 'disabled',
                                  retailer_status : 'disabled'
                              }
                      });
                      this.dialogRef.afterClosed().subscribe(result => {
                        console.log(result);
                        this.recieve(result);
                        console.log('The dialog was closed');
                      });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    showRecieveDialog(drug_data){
        this.productService.trace(drug_data._id)
            .subscribe(
                data => {
                    let trace_details = data
                    // this.loading = false;
                    this.dialogRef = this.dialog.open(ProductRecieveDialogComponent,{
                        width: '600px',
                        height: '500px',
                        data: { }
                      });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
