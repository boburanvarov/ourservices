import { Component, OnInit } from '@angular/core';
import {Vacancies} from "../../interfaces/vacancies.interfaces";
import {VacanciesService} from "../../services/vacancies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  constructor(private vacanciesService: VacanciesService,
              private router: Router) { }

  ngOnInit(): void {
    this.allVacancies()
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

  resume(){
    this.router.navigate(['our'])
  }

}
