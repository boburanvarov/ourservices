import { Component, OnInit } from '@angular/core';
import {Vacancies} from "../../shared/interfaces/vacancies.interfaces";
import {VacanciesService} from "../../shared/services/vacancies.service";
import {Router} from "@angular/router";
import {TokenService} from '../../shared/services/token.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.allVacancies();
    this.tokenService.removeGroupSessionStroge()
  }

  // vacancies=[
  //   {
  //     date:"12.01.2022",
  //     vacanciesTitle: "Kadrlar idorasi ish bolimni katta mutahasisi"
  //   },
  //   {
  //     date:"14.03.2022",
  //     vacanciesTitle: "Tizim tahlilchisi"
  //   },
  //   {
  //     date:"23.05.2022",
  //     vacanciesTitle: "IOS Developer"
  //   },
  // ]


  // @ts-ignore
  vacancies: Vacancies[]=[];

  allVacancies(){
    this.vacanciesService.getVacancies().subscribe((res)=>{
      console.log(res, 'res');
      this.vacancies = res.content
      console.log(this.vacancies,'va')
    })
  }

  resume(vacancy: any){
      sessionStorage.setItem('vacancy',JSON.stringify(vacancy));
    this.router.navigate(['steps/passport'])
      console.log(vacancy);
  }

}
