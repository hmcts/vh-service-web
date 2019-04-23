import { AdalInterceptor } from 'adal-angular4';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomAdalInterceptor implements HttpInterceptor {

  constructor(public adalInteceptor: AdalInterceptor) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'GET') {
      const customRequest = request.clone({
        headers: request.headers.set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
      });
      return this.adalInteceptor.intercept(customRequest, next);
    }
    return this.adalInteceptor.intercept(request, next);
  }
}
