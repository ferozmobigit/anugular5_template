import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { DistributorRoutingModule } from './distributor-routing.module';
import { DistributorComponent } from './distributor.component';
import { PageHeaderModule } from './../../shared';
import { AlertService } from '../../shared/_services/index';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { GridModule } from '../grid/grid.module';
import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [CommonModule, DistributorRoutingModule, PageHeaderModule, FormsModule, BsComponentModule, GridModule, TablesModule],
    declarations: [DistributorComponent],
    providers: [
      AlertService,

  ],
})
export class DistributorModule {}
