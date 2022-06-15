import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from '../services/token.service';
import {finalize} from 'rxjs/operators';
import {LoadingService} from '../services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService,  private loadingService: LoadingService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authHeaderString = this.tokenService.getToken();
        this.loadingService.isLoading.next(true)
        if (authHeaderString) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authHeaderString,
                }
            });
        }
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.isLoading.next(false);
            })
        );
    }

}
