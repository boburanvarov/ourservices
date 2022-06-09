import {Component, OnInit} from '@angular/core';
import {VacanciesService} from '../../services/vacancies.service';
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

    ExportToDoc(element, filename = ''){
        console.log(element);
        var header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title>

            </head><body>`;

        let footer = "</body></html>";

        let html = header + document.getElementById(element).innerHTML + footer;

        let blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        // Specify link url
        let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

        // Specify file name
       // filename = filename?filename+'.docx':'document.docx';

        // Create download link element
        let downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = url;

            // Setting the file name
            downloadLink.download = 'document.doc';

            //triggering the function
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }

}
