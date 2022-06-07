import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
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
    languages: any[] = [];

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
        lName: ['', [
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

    workExperience = this.fb.group({
        workExprienceElements: this.fb.array([])
    });

    educationInfo = this.fb.group({
        educationInfoElements: this.fb.array([])
    });


    relativeInfo = this.fb.group({
        relativeInfoElements: this.fb.array([])
    });

    languagesForm = this.fb.group({
        languages: ['', Validators.required]
    })

    get workExprienceElements() {
        return this.workExperience.get('workExprienceElements') as FormArray;
    }

    get educationInfoElements() {
        return this.educationInfo.get('educationInfoElements') as FormArray;
    }

    get relativeInfoElements() {
        return this.relativeInfo.get('relativeInfoElements') as FormArray;
    }

    newWorkExperience() {
        return this.fb.group({
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            company: ['', Validators.required],
            position: ['', Validators.required],
        });
    }

    newEducationInfo() {
        return this.fb.group({
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            name: ['', Validators.required],
            faculty: ['', Validators.required],
        });
    }

    newRelativeInfo() {
        return this.fb.group({
            kinship: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            middle_name: ['', Validators.required],
            birth_date: ['', Validators.required],
            birth_place: ['', Validators.required],
            position: ['', Validators.required],
            living_place: ['', Validators.required],
        });
    }

    uploadedFiles: any[] = [];

    ngOnInit() {
        this.workExprienceElements.push(this.newWorkExperience());
        this.educationInfoElements.push(this.newEducationInfo());
        this.relativeInfoElements.push(this.newRelativeInfo());
        this.getLanguages();
    }


    //addWork
    add(elementName: any) {
        if(elementName === this.workExprienceElements) {
            console.log(elementName, 'elem');
            elementName.push(this.newWorkExperience());
        }

        if(elementName === this.educationInfoElements){
            elementName.push(this.newEducationInfo());
        }

        if(elementName === this.relativeInfoElements){
            elementName.push(this.newRelativeInfo());
        }

    }

    //deleteWork
    deleteItem(index: number, elementName: any) {
        if(elementName === this.workExprienceElements) {
            this.workExprienceElements.removeAt(index);
        }

        if(elementName === this.educationInfoElements){
            this.educationInfoElements.removeAt(index);
        }

        if(elementName === this.relativeInfoElements){
            this.relativeInfoElements.removeAt(index);
        }

    }


    // //addEduction
    // addEducation() {
    //     console.log(this.languagesForm.get('languages').value, 'lang');
    //     this.educationInfoElements.push(this.newEducationInfo());
    // }

    // //deleteEduction
    // deleteEducation(index: number) {
    //     this.educationInfoElements.removeAt(index);
    // }



    dateFormater(date: any) {
        return formatDate(new Date(Date.parse(date)), 'dd.MM.yyyy', 'en');
    }

    onBasicUploadAuto(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    getLanguages() {
        this.vacanciesService.getAllLanguages().subscribe((res) => {
            this.languages = res;

        });
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
