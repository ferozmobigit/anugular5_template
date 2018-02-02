import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { ManufactureComponent } from './manufacture.component';
import { PageHeaderModule } from './../../shared';
import { AlertService } from '../../shared/_services/index';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { GridModule } from '../grid/grid.module';
import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [CommonModule, ManufactureRoutingModule, PageHeaderModule, FormsModule, BsComponentModule, GridModule, TablesModule],
    declarations: [ManufactureComponent],
    providers: [
      AlertService,
  ],
})
export class ManufactureModule {}
