import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../constants/consts';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VacanciesService {

    constructor(private http: HttpClient) {
    }

    postPassport(body: any) {
        return this.http.post<any>(API + 'nibbd/get-client-info', body);
    }

    getVacancies() {
        return this.http.get<any>(API + 'vacancy?page=&size&sort');
    }

    getAllLanguages() {
        return this.http.get<any>(API + 'languages');
    }

    postWork(body: any): Observable<any> {
        return this.http.post<any>(API + 'work', body);
    }

    editWorks(body: any): Observable<any> {
        return this.http.put<any>(API + 'work', body);
    }


    postEdu(body: any): Observable<any> {
        return this.http.post<any>(API + 'education', body);
    }

    editEducations(body: any): Observable<any> {
        return this.http.put<any>(API + 'education', body);
    }


    postRelative(body: any): Observable<any> {
        return this.http.post<any>(API + 'relative', body);
    }

    editRelative(body: any): Observable<any> {
        return this.http.put<any>(API + 'relative', body);
    }

    postResume(body: any) {
        return this.http.post<any>(API + 'resume', body);
    }

    editResume(body: any): Observable<any> {
        return this.http.put<any>(API + 'resume', body);
    }

    getResumeId(id: number) {
        return this.http.get<any>(API + 'resume/' + id);
    }

}
