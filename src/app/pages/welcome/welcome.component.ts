import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  vacanciesBlock=[
    {
      vacancyName: "kadrlar idorasi"
    },
    {
      vacancyName: "Tizim tahlilchisi"
    },
    {
      vacancyName: "IT bo'limi"
    },
  ]

  vacanciesForm= this.fb.group({
    vacancies: []
  })
  ngOnInit() {
  }

}
