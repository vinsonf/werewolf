import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { SocketioService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'client';
  constructor(private socketService: SocketioService, public api: ApiService) {}

  ngOnInit() {
    this.api.get('test').subscribe(res => console.log(res))
    this.socketService.getMessage().subscribe(message => { console.log(message); });
  }
}
