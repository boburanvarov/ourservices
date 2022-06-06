import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {VacanciesService} from '../../services/vacancies.service';
import {formatDate} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-our',
    templateUrl: './our.component.html',
    styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit {

    showLogin = false;
    passwordVisible = false;
    passwordVisible2 = false;

    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private messageService: MessageService
    ) {
    }


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

    basicInfor = this.fb.group({
        fName: ['', [
            Validators.required,
            Validators.maxLength(200),
            Validators.minLength(2)
        ]
        ],
        name: ['', [
            Validators.required,
            Validators.maxLength(200),
            Validators.minLength(4)
        ]
        ],
        lName:  ['', [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(5)
        ]
        ],
        birth_date: ['', Validators.required],
        birth_place: ['', Validators.required],
        nationality: ['', Validators.required],
        phone: ['', Validators.required],
    });

    personalInfor = this.fb.group({
        partisanship: ['', Validators.required],
        education_degree: ['', Validators.required],
        specialty: ['', Validators.required],
        academic_degree: ['', Validators.required],
        awards: ['', Validators.required],
        government_agencies: ['', Validators.required],
        email: ['', Validators.required],
    });

    uploadedFiles: any[] = [];
    ngOnInit() {
    }


    dateFormater(date: any) {
        return formatDate(new Date(Date.parse(date)), 'dd.MM.yyyy', 'en');
    }

    onBasicUploadAuto(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    // onChange(result: Date): void {
    //     console.log('onChange: ', result);
    // }

    passportSubmit() {
        if (!this.passportForm.valid) {
            this.passportForm.markAllAsTouched();
            return;
        }
        // @ts-ignore
        console.log(this.passportForm.get('number').value);
        const body = {
            passportNumber: this.passportForm.get('number').value,
            series: this.passportForm.get('series').value,
            birthDate: this.dateFormater(this.passportForm.get('birthDate').value)
        };
        console.log(body);
        if (body.passportNumber == '1234567' && body.series == 'AB' && body.birthDate == '04.06.2022') {
            this.showLogin = true;
            console.log(this.showLogin);
        } else {
            this.showLogin = false;
        }
        // this.vacanciesService.postPassport(body).subscribe((res)=>{
        //
        // })

    }

}
