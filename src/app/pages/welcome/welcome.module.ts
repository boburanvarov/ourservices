import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { OurComponent } from '../../shared/components/our/our.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzFormModule} from "ng-zorro-antd/form";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule
  ],
  declarations: [WelcomeComponent, OurComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }