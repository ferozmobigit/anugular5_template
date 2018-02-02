import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService, DistributorService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Distributor } from '../../shared/index';

@Component({
    selector: 'app-distributor',
    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.scss'],
    animations: [routerTransition()]
})
export class DistributorComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
