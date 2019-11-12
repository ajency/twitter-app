import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SingleTweetComponent } from '../single-tweet/single-tweet.component';

@NgModule({
  declarations: [SearchPageComponent,SingleTweetComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule
  ]
})
export class SearchPageModule { }
