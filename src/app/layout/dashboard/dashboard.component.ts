import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    users: Array<any> = [];

    constructor(private userService:UserService) {
        let role = localStorage.getItem('role');
    }

    ngOnInit() { this.getAllUsers(); }

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

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
