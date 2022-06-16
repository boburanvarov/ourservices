import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';


@Component({
    selector: "app-menu",
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

    userInfo : any;

    constructor(public app: AppComponent, ) { }

    ngOnInit() {


    }
}
