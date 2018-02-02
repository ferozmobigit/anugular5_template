import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Retailer } from '../../shared/index';

@Component({
    selector: 'app-retailer',
    templateUrl: './retailer.component.html',
    styleUrls: ['./retailer.component.scss'],
    animations: [routerTransition()]
})
export class RetailerComponent implements OnInit {
    constructor() { }

    ngOnInit() {

    }

}
