import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from '../services/token.service';
import {finalize} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authHeaderString = this.tokenService.getToken();
        console.log(authHeaderString, 'header');
        if (authHeaderString) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authHeaderString,
                }
            });
        }
        return next.handle(req).pipe(
            finalize(() => {
            })
        );
    }

}
