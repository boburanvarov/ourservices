import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {VacanciesService} from '../../services/vacancies.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.scss']
})
export class PassportInfoComponent implements OnInit {


    personInfo: any;

    passportForm = this.fb.group({
        series: ['AB', [
            Validators.required,
            Validators.maxLength(2),
            Validators.minLength(2)
        ]
        ],
        number: ['3253882', [
            Validators.required,
            Validators.maxLength(7),
            Validators.minLength(7)
        ]
        ],
        birthDate: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    dateFormater(date: any) {
        return formatDate(new Date(Date.parse(date)), 'dd.MM.yyyy', 'en');
    }


    passportSubmit() {
        if (!this.passportForm.valid) {
            this.passportForm.markAllAsTouched();
            return;
        }
        // @ts-ignore
        console.log(this.passportForm.get('number').value);
        const body = {
            p_number: this.passportForm.get('number').value,
            p_series: this.passportForm.get('series').value,
            birth_date: this.dateFormater(this.passportForm.get('birthDate').value)
        };
        console.log(body);
        // if (body.passportNumber == '1234567' && body.series == 'AB' && body.birthDate == '04.06.2022') {
        //     this.showLogin = true;
        //     console.log(this.showLogin);
        // } else {
        //     this.showLogin = false;
        // }
        this.vacanciesService.postPassport(body).subscribe((res) => {
                if (res) {
                    console.log(res);
                    this.personInfo = res;
                    this.router.navigate(['steps/our']);
                    sessionStorage.setItem('passportInfo', JSON.stringify(this.personInfo))


                }
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
