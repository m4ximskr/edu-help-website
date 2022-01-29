import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from './order.component';
import {OrderFormModule} from '../../shared/components/ui/order-form/order-form.module';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [OrderComponent],
    imports: [
        CommonModule,
        OrderFormModule,
        MatButtonModule,
        RouterModule,
        MatIconModule
    ],
  exports: [OrderComponent]
})
export class OrderModule { }
