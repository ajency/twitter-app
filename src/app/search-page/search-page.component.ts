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
  dummy = [];
  noPosts = false;

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
    this.tweets = [];
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

  setTimer(){
    this.timeLeft = 30;
    this.interval = setInterval(() => {
      this.setTime();
    },1000);
  }

  getAllTweets(){
    this.unsubscribeTweetsApi();
    let url = this.apiservice.apiUrl + '/twittersearch?key='+((!this.twitterParam || this.twitterParam.trim() == '') ? "adobe" : this.twitterParam);

    this.tweetsApiCall = this.apiservice.request(url,'get',{}).subscribe((data)=>{
      if(data.statuses && data.statuses.length != 0) {
        let i=0;
        for (const tweet of data.statuses.reverse()) {
          if (this.dummy.indexOf(tweet.id) < 0) {
            this.dummy.push(tweet.id);
            setTimeout(() => {
              this.tweets.unshift(tweet);
            }, 500 * i++);
          }
        }
      } else {
        if(this.tweets.length == 0) {
          this.noPosts = true;
        }
      }
      this.setTimer();
    },
    (error)=>{
      if(this.tweets.length == 0) {
        this.noPosts = true;
      }
      this.setTimer();
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
    this.noPosts = false;
  }
}
