import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

	apiUrl = '';
	handleError : any;
	constructor(private http : HttpClient) {
		this.handleError = (error: any): Promise<any> => {
		    let prerror = this.parseRejectedError(error);
		    return Promise.reject(prerror);
		}
	}

	public request(url: string,type: string, body: object): any{
		let headers = new HttpHeaders();
		let httpEvent;
		if(type == 'get'){
			httpEvent = this.http.get(url,{params : this.toHttpParams(body), headers: headers});
		}
		else if(type == 'post'){
			//
		}

		return httpEvent
	}

	public parseRejectedError(error: any): any{
		try{
			let error_object = {
				message : JSON.parse(error._body).message,
				status : error.status
			}
			return error_object
		}
		catch(e){
			return error;
		}
	}

	toHttpParams(params) {
		return Object.getOwnPropertyNames(params)
	    .reduce((p, key) => p.set(key, params[key]), new HttpParams());
	}
}
