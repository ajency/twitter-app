import { Component, OnInit, Input } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

	@Input() searchParam : any;

	constructor(private appService: AppServiceService) { }

	ngOnInit() { }

	searchTweets() {
		this.appService.searchParamTrigger(this.searchParam);
	}

	clearSearch(){
		this.searchParam = '';
		this.searchTweets();
	}

	enterClick(event){
		if (event.keyCode === 13) {
		    this.searchTweets();
		}
	}
}
