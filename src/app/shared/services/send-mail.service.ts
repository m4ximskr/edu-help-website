import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  RequestOrderData,
  RequestQuestionData, RequestTutoringData,
} from "../interfaces/request-data";
import {timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private headers = { 'Content-Type': 'application/json' };
  private apiUrl = 'https://api.eduhelp.lv'
  // private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  sendOrderMail(data: RequestOrderData) {
    return this.http.post(`${this.apiUrl}/send-order-mail`, {params: data, headers: this.headers});
    // return timer(2000);
  }

  sendQuestionMail(data: RequestQuestionData) {
    return this.http.post(`${this.apiUrl}/send-question-mail`, {params: data, headers: this.headers});
    // return timer(2000);
  }

  sendTutoringOrderMail(data: RequestTutoringData) {
    return this.http.post(`${this.apiUrl}/send-tutoring-mail`, {params: data, headers: this.headers});
    // return timer(2000);
  }

}
