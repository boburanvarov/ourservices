import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
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
import {ToastModule} from 'primeng/toast';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {StepsModule} from 'primeng/steps';
import {VacanciesStepsComponent} from '../../shared/components/vacancies-steps/vacancies-steps.component';
import {MenuItem} from 'primeng/api';
import {PassportInfoComponent} from '../../shared/components/passport-info/passport-info.component';
import {OurWordComponent} from '../../shared/components/our-word/our-word.component';

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
        ToastModule,
        SweetAlert2Module,
        StepsModule,
    ],
    declarations: [
        WelcomeComponent,
        OurComponent,
        VacanciesComponent,
        VacanciesStepsComponent,
        PassportInfoComponent,
        OurWordComponent,
    ],
    exports: [WelcomeComponent],
    providers: [
        MessageService,
    ]
})
export class WelcomeModule {
}
