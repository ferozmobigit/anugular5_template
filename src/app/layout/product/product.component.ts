import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService, ProductService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../shared/index';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [routerTransition()]
})
export class ProductComponent implements OnInit {
    model: any = {};
    products: Product[];
    loading = false;
    closeResult: string;
    product_details: any;
    transfer_product_info:any;
    open(content) {
        this.modalService.open(content).result.then((result) => {
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
        private modalService: NgbModal) { }

    addProduct() {
        this.loading = true;
        this.productService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Product added', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.getAllProducts()
        // let product = new Product();
        // let products = [];
        // product._id = "1"
        // product.description="Sme desc"
        // product.diseaseName = "Algimers"
        // product.drugName = "ABN Vaccine"
        // products.push(product);
        // this.products = products;
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
        this.productService.getById(id)
            .subscribe(
                data => {
                    this.product_details = data
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
                    this.product_details = data
                    this.alertService.success('Product Transfered', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
