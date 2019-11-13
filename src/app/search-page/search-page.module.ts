import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SingleTweetComponent } from '../single-tweet/single-tweet.component';
import { SearchBoxComponent } from '../search-box/search-box.component';

@NgModule({
  declarations: [SearchPageComponent,SingleTweetComponent,SearchBoxComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    FormsModule
  ]
})
export class SearchPageModule { }
