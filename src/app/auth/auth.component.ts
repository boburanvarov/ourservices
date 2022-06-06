import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private authService$: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.userLoginForm.valid) {
      console.log('form error');
      return;
    }
    console.log('submitted');

    const username = this.userLoginForm.controls['username'].value;
    const password = this.userLoginForm.controls['password'].value;

    const body ={
      username: username,
      password: password
    }

    this.authService$.login(body).subscribe(res => {
      // console.log(res);
      sessionStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/']).then();
    }, error => {
      // console.log(error);
      // this.errorMessage = error.error.status + ' ' + error.error.description;
    });
  }
}
