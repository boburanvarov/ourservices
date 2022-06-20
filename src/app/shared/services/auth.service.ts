import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vacancies} from '../interfaces/vacancies.interfaces';
import {API} from '../constants/consts';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(body: any) {
        return this.http.post<any>(API + 'auth/login', body);
    }

}
