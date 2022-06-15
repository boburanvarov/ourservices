import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome.component';
import {VacanciesComponent} from '../vacancies/vacancies.component';
import {OurComponent} from '../our/our.component';
import {VacanciesStepsComponent} from '../vacancies-steps/vacancies-steps.component';
import {PassportInfoComponent} from '../passport-info/passport-info.component';
import {OurWordComponent} from '../our-word/our-word.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'vacancies',
        component: VacanciesComponent
    },

    {
        path: 'steps',
        component: VacanciesStepsComponent,
        children: [
            {
                path: 'passport',
                component: PassportInfoComponent
            },
            {
                path: 'our',
                component: OurComponent
            },

            {
                path: 'ourWord',
                component: OurWordComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
