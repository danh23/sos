import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the ServicesDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServicesDataServiceProvider Provider');
  }

  getQuestions():Observable<any> {
    //return this.http.get("url").map(res => res.json());
    return new Observable<any>(observer=>{
      let questions: any[] = [{message: "question 1", type: 1}, {message: "question 2", type: 2}, {message: "question 3", type: 3}, {message: "question 4", type: 4}];
        observer.next(questions);
        observer.complete();
      }
    );
  }

}
