/* tslint:disable */

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
import {LoadingService} from '../../shared/services/loading.service';
import {DomSanitizer} from '@angular/platform-browser';
import {error} from 'protractor';


@Component({
    selector: 'app-our',
    templateUrl: './our.component.html',
    styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit, OnDestroy {
    @ViewChild('saveSwal')
    public readonly saveSwal!: SwalComponent;

    @ViewChild('saveSwal2')
    public readonly saveSwal2!: SwalComponent;

    @ViewChild('warnSwal')
    public readonly warnSwal!: SwalComponent;

    base64textString: any;
    isImageSaved: boolean = false;
    showLogin = false;
    languages: any[] = [];
    workInfo: any[] = [];
    eduInfo: any[] = [];
    relatives: any[] = [];
    activeDisabled = true;
    imageError: string = '';
    personInfo: any;
    education_level: any[];
    fileSize: number = 0;
    editWork: any[] = [];
    editEdu: any[] = [];
    editRelative: any[] = [];
    vacancy: any;

    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private messageService: MessageService,
        private router: Router,
        public loadingService: LoadingService,
        private sanitizer: DomSanitizer
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
            id: [],
            created_at: [],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            company: ['', Validators.required],
            position: ['', Validators.required],
        });
    }

    newEducationInfo() {
        return this.fb.group({
            id: [],
            created_at: [],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            name: ['', Validators.required],
            faculty: ['', Validators.required],
        });
    }

    newRelativeInfo() {
        return this.fb.group({
            id: [],
            created_at: [],
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
            {name: '???????????? ??????????????????????', code: '???????????? ??????????????????????'},
            {name: `?????????????? ??????????????????????`, code: `?????????????? ??????????????????????`},
        ];
        const resume = Utils.getItem('resume');
        if (resume) {
            this.activeDisabled = false;
            this.base64textString = this.sanitizer.bypassSecurityTrustResourceUrl(resume.image);
        }
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

        }
        if (!Utils.IsExist('personalInfor')) {
            this.personalInfor.patchValue(Utils.getItem('personalInfor'));

        }
        if (!Utils.IsExist('workExperience')) {
            if (Utils.getItem('workExperience').length > 1) {
                this.workExprienceElements.push(this.newWorkExperience());
            }
            this.workExprienceElements.patchValue(Utils.getItem('workExperience'));

        }
        if (!Utils.IsExist('educationInfo')) {
            if (Utils.getItem('educationInfo').length > 1) {
                this.educationInfoElements.push(this.newEducationInfo());
            }
            this.educationInfoElements.patchValue(Utils.getItem('educationInfo'));

        }
        if (!Utils.IsExist('relativeInfo')) {
            if (Utils.getItem('relativeInfo').length > 1) {
                this.relativeInfoElements.push(this.newRelativeInfo());
            }
            this.relativeInfoElements.patchValue(Utils.getItem('relativeInfo'));

        }
        if (!Utils.IsExist('languagesForm')) {
            this.languagesForm.patchValue(Utils.getItem('languagesForm'));

        }


    }


    saveSwalFunc() {
        this.router.navigate(['steps/ourWord']).then(() => {

        });

    }

    saveSwalFunc2() {
        this.router.navigate(['welcome'])
    }

    warnSwalFunc() { }

    ngOnDestroy() {
        const resume = Utils.getItem('resume');
        if (resume) {
            sessionStorage.setItem('basicInfor', JSON.stringify(this.basicInfor.value));
            sessionStorage.setItem('personalInfor', JSON.stringify(this.personalInfor.value));
            sessionStorage.setItem('workExperience', JSON.stringify(resume.work_info));
            sessionStorage.setItem('educationInfo', JSON.stringify(resume.education_info));
            sessionStorage.setItem('relativeInfo', JSON.stringify(resume.relatives));
            sessionStorage.setItem('languagesForm', JSON.stringify(this.languagesForm.value));
        }

        // sessionStorage.setItem('basicInfor', JSON.stringify(this.basicInfor.value));
        // sessionStorage.setItem('personalInfor', JSON.stringify(this.personalInfor.value));
        // sessionStorage.setItem('workExperience', JSON.stringify(this.workInfo));
        // sessionStorage.setItem('educationInfo', JSON.stringify(this.eduInfo));
        // sessionStorage.setItem('relativeInfo', JSON.stringify(this.relatives));
        // sessionStorage.setItem('languagesForm', JSON.stringify(this.languagesForm.value));

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
            this.fileSize = fileInput.target.files[0].size;
            console.log(fileInput.target.files[0].size);
            if (fileInput.target.files[0].size > maxsize) {
                const mb = fileInput.target.files[0].size / maxsize;
                this.imageError =
                    '???????????? ?????????????????????? ???? ???????????? ?????????????????? 2 ????.' + mb.toFixed(2) + 'Mb';
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


            this.vacanciesService.postWork(body).subscribe((res) => {

                    this.workInfo.push(res);
                    // console.log(this.workInfo,'work');
                    // console.log(res, 'res');
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ??????????????????'
                    });

            },
                (error)=>{
                    if (error.status) {
                        this.messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary: '?????????????????? ???????????? ?????? ???????????????????? ????????????????????'
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


                    this.eduInfo.push(res);
                    console.log(res);
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ??????????????????'
                    });

            },
                (error)=>{
                    if (error.status) {
                        this.messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary: '?????????????????? ???????????? ?????? ???????????????????? ????????????????????'
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
                    this.relatives.push(res);
                    console.log(res);
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ??????????????????'
                    });

            },
                (error)=>{
                    if (error.status) {
                        this.messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary: '?????????????????? ???????????? ?????? ???????????????????? ????????????????????'
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

        console.log(this.fileSize);
        console.log(this.workInfo, 'workinfo');
        if (!this.basicInfor.valid) {
            this.basicInfor.markAllAsTouched();
            this.personalInfor.markAllAsTouched();

            this.educationInfoElements.markAllAsTouched();
            return;
        }
        if (!this.personalInfor) {
            this.basicInfor.markAllAsTouched();
            this.personalInfor.markAllAsTouched();

            this.educationInfoElements.markAllAsTouched();
            return;
        }
        if (!this.educationInfoElements.valid) {
            this.educationInfoElements.markAllAsTouched();
            this.basicInfor.markAllAsTouched();
            this.personalInfor.markAllAsTouched();
            return;
        }

        console.log(this.workInfo, 'workinfo2');

        const vacancies = Utils.getItem('vacancy');
        console.log(vacancies);
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
                this.vacancy = res;
                Utils.setItem('resume', res);
                this.saveSwal.fire();
            }, (error) => {
                if (error.status === 404 || error.status === 500) {
                    this.warnSwal.fire();
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
                    this.vacancy = res;
                    Utils.setItem('resume', res);
                    this.activeDisabled = true;
                    this.saveSwal.fire();
                },
                (error) => {
                    if (error.status === 404 || error.status === 500) {
                        this.warnSwal.fire();
                    }
                });
        }
        setTimeout(() => {

        }, 3000);


    }


    editWorks() {

        this.workExprienceElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const body = {
                id: el.value.id,
                start_date: el.value.start_date,
                end_date: el.value.end_date,
                company: el.value.company,
                position: el.value.position
            };


            this.vacanciesService.editWorks(body).subscribe((res) => {

                    this.editWork.push(res);
                    console.log(res, 'res');
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ??????????????????'
                    });
                },
                (error) => {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: '?????????????????? ???????????? ?????? ???????????????????? ????????????????????'
                    });
                }
            );
        });

    }

    editEducation() {

        this.educationInfoElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const edu = {
                id: el.value.id,
                start_date: el.value.start_date,
                end_date: el.value.end_date,
                name: el.value.name,
                faculty: el.value.faculty
            };
            console.log(edu, 'edu');
            this.vacanciesService.editEducations(edu).subscribe((res) => {


                    this.editEdu.push(res);
                    console.log(res);
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ??????????????????'
                    });

                },
                (error) => {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: '?????????????????? ???????????? ?????? ???????????????????? ????????????????????'
                    });
                });
        });

    }

    editRel() {
        this.relativeInfoElements.controls.forEach(el => {
            console.log(el.value, 'el');
            const rel = {
                id: el.value.id,
                kinship: el.value.kinship,
                first_name: el.value.first_name,
                last_name: el.value.last_name,
                middle_name: el.value.middle_name,
                birth_date: el.value.birth_date,
                birth_place: el.value.birth_place,
                position: el.value.position,
                living_place: el.value.living_place,
            };
            console.log(rel, 'rel');
            this.vacanciesService.editRelative(rel).subscribe((res) => {
                    console.log(res);
                    this.editRelative.push(res);
                    console.log(res, 'ed');
                    this.messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: '???????????????????? ?????????????? ????????????????'
                    });

                },
                (error) => {
                    this.messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: '?????????????????? ???????????? ?????? ???????????????? ????????????????????'
                    });
                });
        });
    }

    editResume() {
        const vacancies = Utils.getItem('vacancy');
        const resume = Utils.getItem('resume');

        this.languagesForm.value;
        console.log(this.editRelative);
        if (resume) {
            this.base64textString = resume.image;
            console.log(this.languagesForm.get('languages').value);
            if (vacancies) {
                const body = {
                    id: resume.id,
                    created_at: resume.created_at,
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
                    work_info: this.editWork,
                    education_info: this.editEdu,
                    languages: this.languagesForm.get('languages').value,
                    relatives: this.editRelative,
                    vacancy: vacancies
                };
                console.log(body);
                this.vacanciesService.editResume(body).subscribe((res) => {
                    console.log(res);
                    console.log(res);
                    sessionStorage.setItem('resume', JSON.stringify(res));
                    this.saveSwal2.fire();
                }, (error) => {
                    if (error.status === 404 || error.status === 500) {
                        this.warnSwal.fire();
                    }
                });
            } else {
                const noVacancy = {
                    id: resume.id,
                    created_at: resume.created_at,
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
                    work_info: this.editWork,
                    education_info: this.editEdu,
                    languages: this.languagesForm.get('languages').value,
                    relatives: this.editRelative,
                };
                console.log(noVacancy);
                this.vacanciesService.editResume(noVacancy).subscribe((res) => {
                        console.log(res);
                        console.log(res);
                        Utils.setItem('resume', res);
                        this.activeDisabled = true;
                        this.saveSwal2.fire();
                    },
                    (error) => {
                        if (error.status === 404 || error.status === 500) {
                            this.warnSwal.fire();
                        }
                    });
            }
            setTimeout(() => {

            }, 3000);
        }

    }

}
