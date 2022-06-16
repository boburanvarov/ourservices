import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }


    getToken() {
        // @ts-ignore
        const token = JSON.parse(sessionStorage.getItem('login'));
        return !token ? null : token.access_token;
    }

    clearSessionStorage() {
        sessionStorage.clear();
    }

    removeGroupSessionStroge() {
        sessionStorage.removeItem('vacancy');
        sessionStorage.removeItem('passportInfo');
        sessionStorage.removeItem('resume');
        sessionStorage.removeItem('relativeInfo');
        sessionStorage.removeItem('personalInfor');
        sessionStorage.removeItem('educationInfo');
        sessionStorage.removeItem('workExperience');
        sessionStorage.removeItem('languagesForm');
        sessionStorage.removeItem('basicInfor');
    }

    removeGroupSessionStroge2() {
        sessionStorage.removeItem('passportInfo');
        sessionStorage.removeItem('resume');
        sessionStorage.removeItem('relativeInfo');
        sessionStorage.removeItem('personalInfor');
        sessionStorage.removeItem('educationInfo');
        sessionStorage.removeItem('workExperience');
        sessionStorage.removeItem('languagesForm');
        sessionStorage.removeItem('basicInfor');
    }
}
