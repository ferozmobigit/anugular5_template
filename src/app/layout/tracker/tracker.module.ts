import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { PageHeaderModule } from './../../shared';
import { AlertService } from '../../shared/_services/index';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { GridModule } from '../grid/grid.module';
import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [CommonModule, TrackerRoutingModule, PageHeaderModule, FormsModule, BsComponentModule, GridModule, TablesModule],
    declarations: [TrackerComponent],
    providers: [
      AlertService,
  ],
})
export class TrackerModule {}
