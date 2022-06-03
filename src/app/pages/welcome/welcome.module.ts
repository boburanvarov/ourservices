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
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {VacanciesComponent} from "../../shared/components/vacancies/vacancies.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzDatePickerModule,
    NzCollapseModule
  ],
  declarations: [
    WelcomeComponent,
    OurComponent,
    VacanciesComponent,
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
