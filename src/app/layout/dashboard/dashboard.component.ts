import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared';
import { Router } from '@angular/router';

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
    loading = false;

    constructor(private userService:UserService, private router: Router) {
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
    user_approval(_id: string, isApproved: boolean) {
        this.loading = true;
        this.userService.approve_signup(_id, isApproved)
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.loading = false;
                });
    }
}
