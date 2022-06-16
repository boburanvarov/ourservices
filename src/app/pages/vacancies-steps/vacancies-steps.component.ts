import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from 'primeng/api';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/Utils';

@Component({
    selector: 'app-vacancies-steps',
    templateUrl: './vacancies-steps.component.html',
    styleUrls: ['./vacancies-steps.component.scss']
})
export class VacanciesStepsComponent implements OnInit {

    items: any[];
    stepActive = false;
    mainExit = false
    subscription: Subscription;
    steps: any;
    resume: any;
    vacancy: any;

    constructor(
        public messageService: MessageService,
        private router: Router
    ) {
    }


    ngOnInit(): void {

        this.vacancy = Utils.getItem('vacancy');
        console.log(this.vacancy);
        if(this.vacancy === null){
            this.mainExit = true;
        }else{
            this.mainExit = false;
        }
        this.items = [
            {
                label: 'Паспортные данные',
                routerLink: 'passport',

                command: (event: any) => {
                    console.log(event.item.routerLink);
                    this.step(event);
                }
            },
            {
                label: 'Заполнить резюме',
                routerLink: 'our',
                command: (event: any) => {

                    this.step(event);
                }
            },
            {
                label: 'Формате word',
                routerLink: 'ourWord',
                command: (event: any) => {
                    this.step(event);
                }
            },
        ];

    }

    step(event: any) {
        this.steps = Utils.getItem('passportInfo');

        this.resume = Utils.getItem('resume');
        console.log(event.item.routerLink);
        console.log(this.steps);
        if (this.resume == null) {
            if (event.item.routerLink == 'ourWord') {

                this.router.navigate(['steps/our']);
            }
        }
        if (this.steps == null) {

            this.router.navigate(['steps/passport']);

        } else if (event.item.routerLink == 'passport') {
            this.router.navigate(['steps/passport']);

        } else if (event.item.routerLink == 'our') {

            this.router.navigate(['steps/our']);
        }


        console.log(this.stepActive);
    }


}
