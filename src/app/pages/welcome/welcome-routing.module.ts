import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import {VacanciesComponent} from "../../shared/components/vacancies/vacancies.component";
import {OurComponent} from "../../shared/components/our/our.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path:'vacancies',
    component: VacanciesComponent
  },
  {
    path:'our',
    component: OurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
