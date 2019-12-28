import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clashEvents';
  showOverlay = false;

  isAuth = false;

  constructor(private router: Router,
              private serv: EventService) { }

  ngOnInit() {
    this.isAuth = this.serv.isAuthenticated();
  }

  public toggle() {
    this.showOverlay = !this.showOverlay;
  }

  logOut(): void {
    this.serv.logout();
    this.router.navigate(['/admin']);
  }
}
