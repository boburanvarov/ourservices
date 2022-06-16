import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OurComponent} from '../our/our.component';
import {VacanciesComponent} from '../vacancies/vacancies.component';
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
import {VacanciesStepsComponent} from '../vacancies-steps/vacancies-steps.component';
import {MenuItem} from 'primeng/api';
import {PassportInfoComponent} from '../passport-info/passport-info.component';
import {OurWordComponent} from '../our-word/our-word.component';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {MainsModule} from '../../mains/mains.module';
import {LoadingComponent} from '../../mains/loading/loading.component';

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
        TableModule,
        DropdownModule,
        ButtonModule,
    ],
    declarations: [
        WelcomeComponent,
        OurComponent,
        VacanciesComponent,
        VacanciesStepsComponent,
        PassportInfoComponent,
        OurWordComponent,
        LoadingComponent
    ],
    exports: [WelcomeComponent],
    providers: [
        MessageService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class WelcomeModule {
}
