import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../shared/index';

@Component({
    selector: 'app-tracker',
    templateUrl: './tracker.component.html',
    styleUrls: ['./tracker.component.scss'],
    animations: [routerTransition()]
})
export class TrackerComponent implements OnInit {
    manufacture_status = 'complete'
    distributor_status = 'active'
    retailer_status = 'disabled'
    consumer_status = 'disabled'
    constructor(){}

    ngOnInit(){}
}
