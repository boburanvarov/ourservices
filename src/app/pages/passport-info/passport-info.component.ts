import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {VacanciesService} from '../../shared/services/vacancies.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../shared/services/loading.service';
import {TokenService} from '../../shared/services/token.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-passport-info',
    templateUrl: './passport-info.component.html',
    styleUrls: ['./passport-info.component.scss']
})
export class PassportInfoComponent implements OnInit {

    @ViewChild('saveSwal')
    public readonly saveSwal!: SwalComponent;
    @ViewChild('warnSwal')
    public readonly warnSwal!: SwalComponent;

    personInfo: any;

    passportForm = this.fb.group({
        series: ['', [
            Validators.required,
            Validators.maxLength(2),
            Validators.minLength(2)
        ]
        ],
        number: ['', [
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
        private tokenService: TokenService
    ) {
    }


    ngOnInit(): void {
    }
    saveSwalFunc() {}

    warnSwalFunc() {}

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
        this.tokenService.removeGroupSessionStroge2()
        this.vacanciesService.postPassport(body).subscribe((res) => {

                    // console.log(res);
                    this.personInfo = res;
                    this.router.navigate(['steps/our']);
                    sessionStorage.setItem('passportInfo', JSON.stringify(this.personInfo))

                this.saveSwal.fire();
            },
            (error) => {
                if (error.status === 404 || error.status === 500) {
                    this.warnSwal.fire();
                }
            });

    }

}
