import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../constants/consts";

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  constructor(private  http: HttpClient) { }

  postPassport(body: any){
    return this.http.post<any>(API+ 'passport', body)
  }

  getVacancies(){
    return this.http.get<any>(API+ 'vacancy?page=&size&sort')
  }
}
