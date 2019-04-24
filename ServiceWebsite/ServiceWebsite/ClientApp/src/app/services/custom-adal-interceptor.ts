import { AdalInterceptor, AdalService } from 'adal-angular4';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomAdalInterceptor implements HttpInterceptor {

  constructor(public adalInteceptor: AdalInterceptor, private adal: AdalService) { }

  private interceptWithTokenIfAuthenticated(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // we cannot intercept with adal before it's been initialized,
    // we can't check that but we can check if we're authenticated which is good enough
    if (this.adal.userInfo.authenticated) {
      return this.adalInteceptor.intercept(request, next);
    }

    return next.handle(request);
  }

  private getRequestWithNoCache(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      return this.interceptWithTokenIfAuthenticated(this.getRequestWithNoCache(request), next);
    }

    return this.interceptWithTokenIfAuthenticated(request, next);
  }
}
