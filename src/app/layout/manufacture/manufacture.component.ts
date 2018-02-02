import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/_services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-manufacture',
    templateUrl: './manufacture.component.html',
    styleUrls: ['./manufacture.component.scss'],
    animations: [routerTransition()]
})

export class ManufactureComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
