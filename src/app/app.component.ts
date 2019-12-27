import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clashEvents';
  showOverlay = false;

  constructor() { }

  public toggle() {
    this.showOverlay = !this.showOverlay;
  }
}
