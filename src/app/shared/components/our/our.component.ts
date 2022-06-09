import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {VacanciesService} from '../../services/vacancies.service';
import {formatDate} from '@angular/common';
import {MessageService} from 'primeng/api';
import * as _ from 'lodash';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-our',
    templateUrl: './our.component.html',
    styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit {
    @ViewChild('saveSwal')
    public readonly saveSwal!: SwalComponent;
    @ViewChild('warnSwal')
    public readonly warnSwal!: SwalComponent;

    base64textString: string = '';
    isImageSaved: boolean = false;
    showLogin = false;
    passwordVisible = false;
    passwordVisible2 = false;
    languages: any[] = [];
    workInfo: any[] = [];
    eduInfo: any[] = [];
    relatives: any[] = [];
    activeDisabled = false;


    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private messageService: MessageService
    ) {
    }




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


    ngOnInit() {
        const passportInfo =  JSON.parse(sessionStorage.getItem('passportInfo'));
        if(passportInfo){
            this.patchValues(passportInfo)
            this.workExprienceElements.push(this.newWorkExperience());
            this.educationInfoElements.push(this.newEducationInfo());
            this.relativeInfoElements.push(this.newRelativeInfo());
            this.getLanguages();
            this.showLogin = true;
        }




    }
    saveSwalFunc() {

    }

    warnSwalFunc() {

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

    imageError: string = '';

    onBasicUploadAuto(fileInput: any) {

        if (fileInput.target.files && fileInput.target.files[0]) {
            const maxsize = 2097152 //1048576;
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

            // if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
            //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
            //
            // }


        }
    }

    removeImage() {
        this.base64textString = null;
        this.isImageSaved = false;
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
            console.log(body);
            this.vacanciesService.postWork(body).subscribe((res) => {
                if (res) {
                    this.workInfo.push(res);
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


    // onChange(result: Date): void {
    //     console.log('onChange: ', result);
    // }

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
        // fName:
        //     name:
        //     lName:
        //     birth_date:
        //     birth_place:
        //     nationality:
        //     phone:
        //     images:
        // partisanship:
        //     education_degree:
        //     specialty:
        //     academic_degree:
        //     awards:
        //     government_agencies:
        //     email:


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
                const body = {
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
                    vacancy: vacancies
                };
                console.log(body);
                this.vacanciesService.postResume(body).subscribe((res) => {
                    console.log(res);
                    console.log(res);
                    sessionStorage.setItem('resume', JSON.stringify(res))
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
                        sessionStorage.setItem('resume', JSON.stringify(res))
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
