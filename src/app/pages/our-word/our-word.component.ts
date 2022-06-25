import {Component, OnInit} from '@angular/core';
import {VacanciesService} from '../../shared/services/vacancies.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { Packer } from 'docx';
import { saveAs } from 'file-saver/FileSaver';


@Component({
    selector: 'app-our-word',
    templateUrl: './our-word.component.html',
    styleUrls: ['./our-word.component.scss']
})
export class OurWordComponent implements OnInit {

    tableTitle = [
        {
            name: 'Қариндошлик'
        },
        {
            name: 'Исм'
        },
        {
            name: 'Фамилия'
        },
        {
            name: 'Отасининг исми'
        },
        {
            name: 'Туғилган кун'
        },
        {
            name: 'Туғилган жой'
        },
        {
            name: 'Лавозими'
        },
        {
            name: 'Яшаш жойи'
        },
    ]

    constructor(private vacanciesServices: VacanciesService,
                private router: Router,
                private sanitizer: DomSanitizer) {
    }

    resume: any;
    resumeItem: any;
    base64textString: any;

    ngOnInit(): void {
        this.resume = JSON.parse(sessionStorage.getItem('resume'));
        console.log(this.resume, 'resume');
        this.getResume();
    }

    getResume() {
        this.vacanciesServices.getResumeId(this.resume.id).subscribe((res) => {
            console.log(res, 'res');
            this.resumeItem = res;
            console.log(this.resumeItem, 'item');
            this.base64textString = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeItem.image);
        });
    }


}
