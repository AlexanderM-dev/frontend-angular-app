import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class InterceptorService implements HttpInterceptor {

    errorMessage = '';
    // token = localStorage.getItem('token');

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(cloned).pipe(
                catchError((err) => {
                    this.errorMessage = err.message;
                    return throwError(err);
                })
            );
        } else {
            return next.handle(req).pipe(
                catchError((err) => {
                    this.errorMessage = err.message;
                    return throwError(err);
                })
            );
        }
    }

}
