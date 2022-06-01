import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-our',
  templateUrl: './our.component.html',
  styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit {



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

  ngOnInit(): void {
  }

}
