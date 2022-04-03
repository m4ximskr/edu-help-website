import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  // http://localhost:3000/send-mail
  // https://api.eduhelp.lv/send-mail
  // http://localhost:3000/send-order-mail

  sendOrderMail(data) {
    return this.http.post('https://api.eduhelp.lv/send-order-mail', {params: data, headers: this.headers});
    // return of(null);
  }

  sendQuestionMail(data) {
    // return of(null)
    // return throwError('ee')
    return this.http.post('https://api.eduhelp.lv/send-question-mail', {params: data});
  }

}
