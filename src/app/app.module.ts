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
