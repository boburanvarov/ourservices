import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomeModule} from './pages/welcome/welcome.module';
import {InterceptorService} from './shared/interceptor/interceptor.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { VacanciesStepsComponent } from './shared/components/vacancies-steps/vacancies-steps.component';
import {StepsModule} from 'primeng/steps';
import { PassportInfoComponent } from './shared/components/passport-info/passport-info.component';
import { OurWordComponent } from './shared/components/our-word/our-word.component';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        WelcomeModule,
        SweetAlert2Module.forRoot(),

    ],
    providers: [

        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
