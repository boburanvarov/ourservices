/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProgressBarModule } from "primeng/progressbar";
import { AppComponent } from "./app.component";
import { AppFooterComponent } from "./mains/footer/app.footer.component";
import { AppMenuComponent } from "./mains/menu/app.menu.component";
import { MenuService } from "./mains/menu/app.menu.service";
import { AppTopBarComponent } from "./mains/topbar/app.topbar.component";


describe("AppComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ProgressBarModule],
            declarations: [
                AppComponent,
                AppMenuComponent,
                AppTopBarComponent,
                AppFooterComponent,
            ],
            providers: [MenuService],
        });
        TestBed.compileComponents();
    });

    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
