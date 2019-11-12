import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { ApiServiceService } from './service/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-app';

    constructor(private apiservice : ApiServiceService) {
        this.apiservice.apiUrl = environment.apiUrl;
    }
}
