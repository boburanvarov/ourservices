/* tslint:disable */
// noinspection DuplicatedCode

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VacanciesService} from '../../shared/services/vacancies.service';
import {formatDate} from '@angular/common';
import {MessageService} from 'primeng/api';
import * as _ from 'lodash';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Utils} from '../../shared/Utils';

@Component({
    selector: 'app-our',
    templateUrl: './our.component.html',
    styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit, OnDestroy {
    @ViewChild('saveSwal')
    public readonly saveSwal!: SwalComponent;
    @ViewChild('warnSwal')
    public readonly warnSwal!: SwalComponent;

    base64textString: string = '';
    isImageSaved: boolean = false;
    showLogin = false;
    languages: any[] = [];
    workInfo: any[] = [];
    eduInfo: any[] = [];
    eduInfo2 = {};
    relatives: any[] = [];
    activeDisabled = false;
    imageError: string = '';
    personInfo: any;
    education_level: any[];
    editActive = true;

    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private messageService: MessageService,
        private router: Router
    ) {
    }


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
        images: ['', Validators.required],
        education_level: ['', Validators.required],
    });

    personalInfor = this.fb.group({
        partisanship: ['', Validators.required],
        education_degree: ['', Validators.required],
        specialty: ['', Validators.required],
        academic_degree: ['', Validators.required],
        awards: ['', Validators.required],
        government_agencies: ['', Validators.required],
        email: [''],
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
    });

    get workExprienceElements() {
        return this.workExperience.controls.workExprienceElements as FormArray;
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


    ngOnInit() {
        this.education_level = [
            {name: 'Oliy Malumot', code: 'Oliy Malumot'},
            {name: `O'rta maxsus`, code: `O'rta maxsus`},
        ];
        const passportInfo = JSON.parse(sessionStorage.getItem('passportInfo'));
        if (passportInfo) {
            this.workExprienceElements.push(this.newWorkExperience());
            this.educationInfoElements.push(this.newEducationInfo());
            this.relativeInfoElements.push(this.newRelativeInfo());
            this.patchValues(passportInfo);
            this.getLanguages();
            this.showLogin = true;
        }
        if (!Utils.IsExist('basicInfor')) {
            this.basicInfor.patchValue(Utils.getItem('basicInfor'));
            this.editActive = false;
        }
        if (!Utils.IsExist('personalInfor')) {
            this.personalInfor.patchValue(Utils.getItem('personalInfor'));
            this.editActive = false;
        }
        if (!Utils.IsExist('workExperience')) {
            if(Utils.getItem('workExperience').length > 1){
                this.workExprienceElements.push(this.newWorkExperience())
            }
            this.workExprienceElements.patchValue(Utils.getItem('workExperience'));
            this.editActive = false;
        }
        if (!Utils.IsExist('educationInfo')) {
            if(Utils.getItem('educationInfo').length > 1){
                this.educationInfoElements.push(this.newEducationInfo())
            }
            this.educationInfoElements.patchValue(Utils.getItem('educationInfo'));
            this.editActive = false;
        }
        if (!Utils.IsExist('relativeInfo')) {
            if(Utils.getItem('relativeInfo').length > 1){
                this.relativeInfoElements.push(this.newRelativeInfo())
            }
            this.relativeInfoElements.patchValue(Utils.getItem('relativeInfo'));
            this.editActive = false;
        }
        if (!Utils.IsExist('languagesForm')) {
            this.languagesForm.patchValue(Utils.getItem('languagesForm'));
            this.editActive = false;
        }

    }


    saveSwalFunc() {
        this.router.navigate(['steps/ourWord']).then(() => {

        });

    }

    warnSwalFunc() {

    }

    ngOnDestroy() {
        sessionStorage.setItem('basicInfor', JSON.stringify(this.basicInfor.value));
        sessionStorage.setItem('personalInfor', JSON.stringify(this.personalInfor.value));
        sessionStorage.setItem('workExperience', JSON.stringify(this.workInfo));
        sessionStorage.setItem('educationInfo', JSON.stringify(this.eduInfo));
        sessionStorage.setItem('relativeInfo', JSON.stringify(this.relatives));
        sessionStorage.setItem('languagesForm', JSON.stringify(this.languagesForm.value));
    }

    //addWork
    add(elementName: any) {
        if (elementName === this.workExprienceElements) {
            console.log(elementName, 'elem');
            elementName.push(this.newWorkExperience());
        }

        if (elementName === this.educationInfoElements) {
            elementName.push(this.newEducationInfo());
        }

        if (elementName === this.relativeInfoElements) {
            elementName.push(this.newRelativeInfo());
        }

    }

    //deleteWork
    deleteItem(index: number, elementName: any) {
        if (elementName === this.workExprienceElements) {
            this.workExprienceElements.removeAt(index);
        }

        if (elementName === this.educationInfoElements) {
            this.educationInfoElements.removeAt(index);
        }

        if (elementName === this.relativeInfoElements) {
            this.relativeInfoElements.removeAt(index);
        }

    }


    dateFormater(date: any) {
        return formatDate(new Date(Date.parse(date)), 'dd.MM.yyyy', 'en');
    }


    onBasicUploadAuto(fileInput: any) {

        if (fileInput.target.files && fileInput.target.files[0]) {
            const maxsize = 2097152; //1048576;
            const allowedTypes = ['image/png', 'image/jpeg'];

            console.log(fileInput.target.files[0].size);
            if (fileInput.target.files[0].size > maxsize) {
                const mb = fileInput.target.files[0].size / maxsize;
                this.imageError =
                    'Размер изображения не должен превышать 2 мб.' + mb.toFixed(2) + 'Mb';
                console.log(this.imageError);

            } else if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';

            } else {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const image = new Image();
                    image.src = e.target.result;
                    image.onload = rs => {
                        const imgBase64Path = e.target.result;
                        this.base64textString = imgBase64Path;
                        this.isImageSaved = true;
                        console.log(this.base64textString);
                    };
                };
                reader.readAsDataURL(fileInput.target.files[0]);
                this.imageError = '';
                console.log(this.imageError);
            }


        }
    }


    getLanguages() {
        this.vacanciesService.getAllLanguages().subscribe((res) => {
            this.languages = res;

        });
    }

    saveWork() {
        if (!this.workExprienceElements.valid) {
            this.workExprienceElements.markAllAsTouched();
            return;
        }
        this.workExprienceElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const body = {
                start_date: this.dateFormater(el.value.start_date),
                end_date: this.dateFormater(el.value.end_date),
                company: el.value.company,
                position: el.value.position
            };
            // this.workInfo2 = {
            //     workExprienceElements: [
            //         {
            //             start_date: this.dateFormater(el.value.start_date),
            //             end_date: this.dateFormater(el.value.end_date),
            //             company: el.value.company,
            //             position: el.value.position
            //         }
            //     ]
            // };

            this.vacanciesService.postWork(body).subscribe((res) => {
                if (res) {
                    this.workInfo.push(res);
                    console.log(this.workInfo,'work');
                    console.log(res, 'res');
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: 'Информация успешно сохранена'
                    });
                } else {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Произошла ошибка при сохранении информации'
                    });
                }
            });
        });

    }

    saveEdu() {
        if (!this.educationInfoElements.valid) {
            this.educationInfoElements.markAllAsTouched();
            return;
        }
        this.educationInfoElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const edu = {
                start_date: this.dateFormater(el.value.start_date),
                end_date: this.dateFormater(el.value.end_date),
                name: el.value.name,
                faculty: el.value.faculty
            };
            console.log(edu, 'edu');
            this.vacanciesService.postEdu(edu).subscribe((res) => {
                if (res) {

                    this.eduInfo.push(res);
                    console.log(res);
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: 'Информация успешно сохранена'
                    });
                } else {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Произошла ошибка при сохранении информации'
                    });
                }
            });
        });

    }

    saveRelative() {
        if (!this.relativeInfoElements.valid) {
            this.relativeInfoElements.markAllAsTouched();
            return;
        }
        this.relativeInfoElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const rel = {
                kinship: el.value.kinship,
                first_name: el.value.first_name,
                last_name: el.value.last_name,
                middle_name: el.value.middle_name,
                birth_date: this.dateFormater(el.value.birth_date),
                birth_place: el.value.birth_place,
                position: el.value.position,
                living_place: el.value.living_place,
            };
            console.log(rel, 'rel');
            this.vacanciesService.postRelative(rel).subscribe((res) => {

                if (res) {

                    this.relatives.push(res);
                    console.log(res);
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: 'Информация успешно сохранена'
                    });
                } else {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Произошла ошибка при сохранении информации'
                    });
                }
            });
        });

    }


    patchValues(data: any) {
        this.basicInfor.patchValue({
            fName: data.surname,
            name: data.givenname,
            lName: data.patronym,
            birth_date: data.birth_date,
            birth_place: data.birth_place,
            nationality: data.nationality_desc,
        });
    }


    sendResume() {
        console.log(this.workInfo, 'workinfo');
        if (!this.basicInfor.valid && !this.personalInfor.valid && !this.educationInfoElements.valid) {
            this.basicInfor.markAllAsTouched();
            this.personalInfor.markAllAsTouched();
            this.educationInfoElements.markAllAsTouched();
            return;
        }

        const vacancies = JSON.parse(sessionStorage.getItem('vacancy'));

        setTimeout(() => {
            if (vacancies) {
                const form = this.basicInfor.value;
                const body = {
                    first_name: this.basicInfor.get('name').value,
                    last_name: this.basicInfor.get('fName').value,
                    middle_name: this.basicInfor.get('lName').value,
                    education_level: this.basicInfor.get('education_level').value.code,
                    image: this.base64textString,
                    birth_date: this.basicInfor.get('birth_date').value,
                    birth_place: this.basicInfor.get('birth_place').value,
                    nationality: this.basicInfor.get('nationality').value,
                    phone: this.basicInfor.get('phone').value,
                    partisanship: this.personalInfor.get('partisanship').value,
                    education_degree: this.personalInfor.get('education_degree').value,
                    specialty: this.personalInfor.get('specialty').value,
                    academic_degree: this.personalInfor.get('academic_degree').value,
                    awards: this.personalInfor.get('awards').value,
                    government_agencies: this.personalInfor.get('government_agencies').value,
                    email: this.personalInfor.get('email').value,
                    work_info: this.workInfo,
                    education_info: this.eduInfo,
                    languages: this.languagesForm.get('languages').value,
                    relatives: this.relatives,
                    vacancy: vacancies
                };
                console.log(body);
                this.vacanciesService.postResume(body).subscribe((res) => {
                    console.log(res);
                    console.log(res);
                    sessionStorage.setItem('resume', JSON.stringify(res));
                    this.saveSwal.fire();
                    this.activeDisabled = true;
                }, (error) => {
                    if (error.status === 404 || error.status === 500) {
                        this.warnSwal.fire();
                        this.activeDisabled = false;
                    }
                });
            } else {
                const noVacancy = {
                    first_name: this.basicInfor.get('name').value,
                    last_name: this.basicInfor.get('fName').value,
                    middle_name: this.basicInfor.get('lName').value,
                    image: this.base64textString,
                    birth_date: this.basicInfor.get('birth_date').value,
                    birth_place: this.basicInfor.get('birth_place').value,
                    nationality: this.basicInfor.get('nationality').value,
                    phone: this.basicInfor.get('phone').value,
                    partisanship: this.personalInfor.get('partisanship').value,
                    education_degree: this.personalInfor.get('education_degree').value,
                    specialty: this.personalInfor.get('specialty').value,
                    academic_degree: this.personalInfor.get('academic_degree').value,
                    awards: this.personalInfor.get('awards').value,
                    government_agencies: this.personalInfor.get('government_agencies').value,
                    email: this.personalInfor.get('email').value,
                    work_info: this.workInfo,
                    education_info: this.eduInfo,
                    languages: this.languagesForm.get('languages').value,
                    relatives: this.relatives,
                };
                console.log(noVacancy);
                this.vacanciesService.postResume(noVacancy).subscribe((res) => {
                        console.log(res);
                        console.log(res);
                        sessionStorage.setItem('resume', JSON.stringify(res));
                        this.activeDisabled = true;
                        this.saveSwal.fire();
                    },
                    (error) => {
                        if (error.status === 404 || error.status === 500) {
                            this.warnSwal.fire();
                            this.activeDisabled = false;
                        }
                    });
            }
        }, 3000);


    }

}
