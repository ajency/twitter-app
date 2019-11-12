import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor() { }

  timeLeft: number = 30;
  interval;

  ngOnInit() {
  	this.interval = setInterval(() => {
      this.setTime();
    },1000)
  }

  setTime() {
  	if(this.timeLeft > 1) {
		this.timeLeft--;
	} else {
		this.timeLeft = 30;
	}
  }
}
