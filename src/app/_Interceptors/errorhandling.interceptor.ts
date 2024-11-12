import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorhandlingInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let msg = '';
        switch (error.status) {
          case 404:
            this.router.navigate(['/error404']);
            break;
          case 401:
            Swal.fire({
              position: "center",
              icon: "error",
              title: error.statusText,
              showConfirmButton: false,
              timer: 5000
            });
            break;
          case 403:
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Wrong Password or Username",
              showConfirmButton: false,
              timer: 4000
            });
            break;


          case 400:
            Swal.fire({
              position: "center",
              icon: "error",
              title: error.error.message || 'Bad Request',
              showConfirmButton: false,
              timer: 5000
            });
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "error",
              title: error.message || 'An error occurred',
              showConfirmButton: false,
              timer: 5000
            });
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
