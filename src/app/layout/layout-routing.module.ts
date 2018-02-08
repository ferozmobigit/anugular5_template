import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },
            { path: 'manufacture', loadChildren: './manufacture/manufacture.module#ManufactureModule' },
            { path: 'distributor', loadChildren: './distributor/distributor.module#DistributorModule' },
            { path: 'consumer', loadChildren: './consumer/consumer.module#ConsumerModule' },
            { path: 'retailer', loadChildren: './retailer/retailer.module#RetailerModule' },
            { path: 'tracker', loadChildren: './tracker/tracker.module#TrackerModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
