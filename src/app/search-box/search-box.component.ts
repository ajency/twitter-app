import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

	@Input() searchParam : any;//Input query param from parent

	@Output() searchText = new EventEmitter();//Output search param to parent

	constructor() { }

	ngOnInit() { }

	/*Emit param to parent*/
	searchTweets() {
		this.searchText.emit(this.searchParam);
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
