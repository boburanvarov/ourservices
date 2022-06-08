import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {VacanciesService} from '../../services/vacancies.service';
import {formatDate} from '@angular/common';
import {MessageService} from 'primeng/api';
import {error} from 'protractor';

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
    personInfo: any;
    workInfo: any[] = [];
    eduInfo: any[] = [];
    relatives: any[] = [];

    constructor(
        private fb: FormBuilder,
        private vacanciesService: VacanciesService,
        private messageService: MessageService
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
        this.workExprienceElements.push(this.newWorkExperience());
        this.educationInfoElements.push(this.newEducationInfo());
        this.relativeInfoElements.push(this.newRelativeInfo());
        this.getLanguages();
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

    saveMain() {

    }

    base64textString: string = '';
    imageType: string = '';
    isImageSaved: boolean = false;

    onBasicUploadAuto(fileInput: any) {

        if (fileInput.target.files && fileInput.target.files[0]) {
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
        }
    }

    _handleReaderLoaded(readerEvt: any) {
        let binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
    }

    getLanguages() {
        this.vacanciesService.getAllLanguages().subscribe((res) => {
            this.languages = res;

        });
    }

    async saveWork() {
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
                this.workInfo.push(res);
                console.log(res);
                console.log(this.workInfo, 'workInfo');
            });
        });

    }

    saveEdu() {

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
            });
        });

    }

    saveRelative() {

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
                    this.patchValues(this.personInfo);
                    // this.showLogin = true;
                    console.log(this.showLogin);
                }
            },
            (error) => {
                console.log(error);
            }
        );

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
                });
            }else{
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
                });
            }
        }, 3000);



    }

}
