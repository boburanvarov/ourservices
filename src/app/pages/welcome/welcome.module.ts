import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OurComponent} from '../../shared/components/our/our.component';
import {VacanciesComponent} from '../../shared/components/vacancies/vacancies.component';
import {AccordionModule} from 'primeng/accordion';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        WelcomeRoutingModule,
        ReactiveFormsModule,
        AccordionModule,
        InputTextModule,
        CalendarModule,
        FileUploadModule,
        MultiSelectModule,
    ],
  declarations: [
    WelcomeComponent,
    OurComponent,
    VacanciesComponent,
  ],
  exports: [WelcomeComponent],
    providers: [
        MessageService
    ]
})
export class WelcomeModule { }
