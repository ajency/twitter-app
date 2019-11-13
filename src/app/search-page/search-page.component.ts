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
  twitterParam : any;
  searchParam : any;
  tweets = [];
  autoRefresh = true;

  ngOnInit() {
    this.twitterParam = this.route.snapshot.queryParamMap.get('key');
    this.searchParam = this.twitterParam;
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

  searchTweets() {
    this.twitterParam = this.searchParam;
    this.getAllTweets();
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

  changeAutoRefresh(boolean){
    this.autoRefresh = boolean;
    if (!boolean) {
        this.stopInterval();
    } else {
        this.startInterval();
    }
  }

  stopInterval(){
    if(this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
  }

  startInterval(){
    this.stopInterval();
    this.timeLeft = 30;
    this.interval = setInterval(() => {
      this.setTime();
    },1000);
  }

  getAllTweets(){
    this.unsubscribeTweetsApi();
    let url = this.apiservice.apiUrl + '/twittersearch?key='+((!this.twitterParam || this.twitterParam.trim() == '') ? "adobe" : this.twitterParam);

    this.tweetsApiCall = this.apiservice.request(url,'get',{}).subscribe((data)=>{
      this.tweets = data.statuses;
      this.startInterval();
    },
    (error)=>{
      console.log("error in fetching the json",error);
    });
  }

  unsubscribeTweetsApi(){
    if(this.tweetsApiCall){
      this.tweetsApiCall.unsubscribe();
    }
    this.stopInterval();
    this.tweets = [];
  }
}
