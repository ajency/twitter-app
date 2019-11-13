import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)', opacity: 0, height: '0px' }),
        animate('0.35s cubic-bezier(0.215, 0.610, 0.355, 1.000)', 
          style({ transform: 'translateY(0)', opacity: 1, height: '*' }))
      ]),
    ]),
  ]
})
export class SearchPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiservice: ApiServiceService) { }

  timeLeft: number;
  interval;
  tweetsApiCall;
  twitterParam : any;
  searchParam : any;
  tweets = [];
  dummy = [];
  timeouts = [];
  noPosts = false;
  fetchLoader = false;

  ngOnInit() {
    this.twitterParam = (this.route.snapshot.queryParamMap.get('key')) ? this.route.snapshot.queryParamMap.get('key') : '';
    this.searchParam = this.twitterParam;
    this.getAllTweets();
  }

  ngOnDestroy() {
    this.unsubscribeTweetsApi();
  }

  searchByText(search_text){
    this.twitterParam = search_text;
    this.router.navigateByUrl("/?key="+this.twitterParam);
    this.dummy = [];
    this.tweets = [];
    this.getAllTweets();
  }

  setTime() {
  	if(this.timeLeft > 1) {
  		this.timeLeft--;
  	} else {
  		this.getAllTweets(true);
  	}
  }

  setTimer(){
    this.fetchLoader = false;
    this.timeLeft = 30;
    this.interval = setInterval(() => {
      this.setTime();
    },1000);
  }

  getAllTweets(newPosts = false){
    this.unsubscribeTweetsApi();
    let url = this.apiservice.apiUrl + '/twittersearch?key='+((!this.twitterParam || this.twitterParam.trim() == '') ? "adobe" : this.twitterParam);
    this.fetchLoader = true;
    setTimeout(() => {
        this.tweetsApiCall = this.apiservice.request(url,'get',{}).subscribe((data)=>{
          if(data.statuses && data.statuses.length != 0) {
            let i=0;
            for (const tweet of data.statuses.reverse()) {
              if (this.dummy.indexOf(tweet.id) < 0) {
                this.timeouts[i] = setTimeout(() => {
                  this.dummy.push(tweet.id);
                  this.tweets.unshift(tweet);
                }, 600 * i++);
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
    }, ((newPosts) ? 1000 : 0));
  }

  unsubscribeTweetsApi(){
    if(this.tweetsApiCall){
      this.tweetsApiCall.unsubscribe();
    }
    if(this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
    this.timeouts = [];
    this.noPosts = false;
  }
}
