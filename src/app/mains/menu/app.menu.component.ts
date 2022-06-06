import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { DataService } from "../Shared/Services/data/data.service";

@Component({
    selector: "app-menu",
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {
   
    userInfo : any;

    constructor(public app: AppComponent, private data: DataService) { }

    ngOnInit() {

        this.userInfo = this.data.getUserRole(); 
          
    }
}
