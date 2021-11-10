import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
  ) { }
  get(url: string, params?: any): Observable<any> {
    return this.http.get(url, { params }).pipe(catchError(this.errorHandler.bind(this))
    )
  }
  errorHandler(res: any) {
    const error = res.error;
    if (!error) {
      return throwError('Something went wrong');
    }
    let message = error.message;
    return throwError({ messages: message, error })
  }

}
