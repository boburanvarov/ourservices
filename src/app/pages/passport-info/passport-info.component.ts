import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {VacanciesService} from '../../shared/services/vacancies.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../shared/services/loading.service';

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
        private router: Router,
        public loadingService: LoadingService,
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

        console.log(this.passportForm.get('number').value);
        const body = {
            p_number: this.passportForm.get('number').value,
            p_series: this.passportForm.get('series').value,
            birth_date: this.dateFormater(this.passportForm.get('birthDate').value)
        };
        console.log(body);

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
