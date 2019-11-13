import { Injectable, EventEmitter, Output} from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import * as moment from 'moment';

declare var $: any;
// declare var cdn_url : any;

@Injectable()
export class AppServiceService {

  private searchParam = new Subject<any>();

  constructor() { 
  }

  searchParamTrigger(param){
    this.searchParam.next(param);
  }

  listenToSearchParamTrigger() : Observable<any> {    
    return this.searchParam.asObservable();
  }
}
