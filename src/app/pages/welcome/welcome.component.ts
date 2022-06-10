import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from '../../shared/services/token.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {



  constructor(
    private fb: FormBuilder,
    private authService$: AuthService,
    private router: Router,
    private tokenService: TokenService
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

  // vacanciesForm= this.fb.group({
  //   vacancies: []
  // })

  passportForm= this.fb.group({
    series: [],
    number: [],
    birthDate: []
  })

  ngOnInit() {
      this.tokenService.clearSessionStorage()
    const body = {
      username: 'DavrVacancy',
      password: 'davr2001'
    }
    this.authService$.login(body).subscribe((res)=>{

      console.log(res)
      sessionStorage.setItem('login' ,JSON.stringify(res))
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }



}
