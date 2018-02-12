import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService, ProductService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product, UserService } from '../../shared/index';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [routerTransition()]
})
export class ProductComponent implements OnInit {
    model: any = {};
    products: any = {};
    loading = false;
    closeResult: string;
    product_details: any;
    transfer_product_info:any;
    dialogResult:any;
    open(content) {
        this.dialogResult = this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    constructor(
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService,
        private modalService: NgbModal,
        public dialog: MatDialog,
        private userService: UserService) { }

        openDialog(product_data): void {
            console.log(product_data);
            let dialog = this.dialog.open(ProductTrackDialogComponent, {
              width: '600px',
              height: '500px',
              data: {   product_details: product_data,
                        manufacture_status : 'complete',
                        warehouse_status : 'active',
                        distributor_status : 'disabled',
                        retailer_status : 'disabled'
                    }
            });
            dialog.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
            // dialogRef.componentInstance.dialogRef = dialogRef;
          }
    showTransferProductModal(product_data){
        this.userService.getByRole("Warehouse")
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
    addProduct() {
        this.loading = true;
        this.productService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Product added', true);
                    // this.model.c('Close click');
                    this.getAllProducts();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.getAllProducts()
        // let product = new Product();
        // this.products.result = [];
        // product._id = "1"
        // product.description="Sme desc"
        // product.name = "Anti Ageing"
        // product.units = 1200
        // this.products.result.push(product);
    }
    private getAllProducts(){
        // this.loading = true;
        this.productService.getAll()
            .subscribe(
                data => {
                    this.products = data;
                    this.alertService.success('Product added', true);
                },
                error => {
                    this.alertService.error(error);
                    // this.loading = false;
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


}

@Component({
    selector: 'product-track-dialog',
    templateUrl: './productTrackDialog.html',
    styleUrls: ['./product.component.scss'],
  })
  export class ProductTrackDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<ProductTrackDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogRef.updatePosition({ top: '50px', left: '50px' });
       }

    onNoClick(): void {
      this.dialogRef.close();

    }

  }

  @Component({
    selector: 'product-transfer-dialog',
    templateUrl: './productTransferDialog.html',
    styleUrls: ['./product.component.scss'],
  })
  export class ProductTransferDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<ProductTransferDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogRef.updatePosition({ top: '50px', left: '50px' });
       }

    onNoClick(): void {
      this.dialogRef.close();

    }

  }
