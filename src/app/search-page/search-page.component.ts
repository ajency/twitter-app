import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private apiservice: ApiServiceService) { }

  timeLeft: number;
  interval;
  tweetsApiCall;
  searchParam : any;
  tweets = [];

  ngOnInit() {
    this.searchParam = this.route.snapshot.queryParamMap.get('key');
    this.getAllTweets();
  }

  ngOnDestroy() {
    this.unsubscribeTweetsApi();
  }

  setTime() {
  	if(this.timeLeft > 1) {
  		this.timeLeft--;
  	} else {
  		this.getAllTweets();
  	}
  }

  getAllTweets(){
    this.unsubscribeTweetsApi();
    let url = this.apiservice.apiUrl + '/twittersearch?key='+((!this.searchParam || this.searchParam.trim() == '') ? "adobe" : this.searchParam);

    this.tweetsApiCall = this.apiservice.request(url,'get',{}).subscribe((data)=>{
      this.tweets = data.statuses;
      this.timeLeft = 30;
      this.interval = setInterval(() => {
        this.setTime();
      },1000);
    },
    (error)=>{
      console.log("error in fetching the json",error);
    });
  }

  unsubscribeTweetsApi(){
    if(this.tweetsApiCall){
      this.tweetsApiCall.unsubscribe();
    }
    if(this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
    this.tweets = [];
  }
}
