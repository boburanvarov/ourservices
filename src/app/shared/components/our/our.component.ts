import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-our',
  templateUrl: './our.component.html',
  styleUrls: ['./our.component.scss']
})
export class OurComponent implements OnInit {

  showLogin = true;
  passwordVisible = false;
  passwordVisible2 = false;

  constructor(
    private fb: FormBuilder
  ) { }




  passportForm= this.fb.group({
    series: [],
    number: [],
    birthDate: []
  })

  ngOnInit() {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
