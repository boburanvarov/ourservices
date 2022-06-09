import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from 'primeng/api';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-vacancies-steps',
    templateUrl: './vacancies-steps.component.html',
    styleUrls: ['./vacancies-steps.component.scss']
})
export class VacanciesStepsComponent implements OnInit {

    items: any[];
    stepActive = false;
    subscription: Subscription;
    steps: any;

    constructor(
        public messageService: MessageService,
        private router: Router
    ) {
    }


    ngOnInit(): void {



        this.items = [
            {
                label: 'Паспортные данные',
                routerLink: 'passport',

                command: (event: any) => {
                    console.log(event.item.routerLink);
                    this.step(event);
                    this.messageService.add({severity: 'info', summary: 'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Заполнить резюме',
                routerLink: 'our',
                command: (event: any) => {

                    this.step(event);
                    this.messageService.add({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Вы можете получить свое резюме в формате Word',
                routerLink: 'ourWord',
                command: (event: any) => {

                    this.messageService.add({severity: 'info', summary: 'Pay with CC', detail: event.item.label});
                }
            },
        ];

    }

    step(event: any) {
        this.steps = JSON.parse(sessionStorage.getItem('passportInfo'));
        console.log(event.item.routerLink);
        console.log(this.steps);
        if (this.steps == null ) {

                this.router.navigate(['steps/passport']);

        } else if (event.item.routerLink == 'passport') {
            this.router.navigate(['steps/passport']);

        } else if (event.item.routerLink == 'our') {

            this.router.navigate(['steps/our']);

        }

        console.log(this.stepActive);
    }


}
