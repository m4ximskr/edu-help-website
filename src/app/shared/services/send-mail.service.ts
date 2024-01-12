import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, throwError, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private headers = { 'Content-Type': 'application/json' };
  private apiUrl = 'https://api.eduhelp.lv'
  // private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  sendOrderMail(data) {
    return this.http.post(`${this.apiUrl}/send-order-mail`, {params: data, headers: this.headers});
    // return timer(2000);
  }

  sendQuestionMail(data) {
    return this.http.post(`${this.apiUrl}/send-question-mail`, {params: data});
    // return timer(2000);
  }

  sendTutoringOrderMail(data) {
    return this.http.post(`${this.apiUrl}/send-tutoring-mail`, {params: data, headers: this.headers});
    // return timer(2000);
  }

}
