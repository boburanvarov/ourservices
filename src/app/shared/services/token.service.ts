import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }



  getToken(){
    // @ts-ignore
    const token = JSON.parse(sessionStorage.getItem('login'))
    return !token ? null : token.access_token
  }

    clearSessionStorage() {
        sessionStorage.clear();
    }
}
