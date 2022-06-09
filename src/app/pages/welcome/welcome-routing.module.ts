import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome.component';
import {VacanciesComponent} from '../../shared/components/vacancies/vacancies.component';
import {OurComponent} from '../../shared/components/our/our.component';
import {VacanciesStepsComponent} from '../../shared/components/vacancies-steps/vacancies-steps.component';
import {PassportInfoComponent} from '../../shared/components/passport-info/passport-info.component';
import {OurWordComponent} from '../../shared/components/our-word/our-word.component';

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
