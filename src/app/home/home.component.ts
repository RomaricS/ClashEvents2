import { Admin } from './../model/admin';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
admin: Admin = {
  name: '',
  pass: ''
};

cred: Admin = {
  name: 'ukaaAdmin2020',
  pass: 'canthackthis2020'
};

isAuth = false;

constructor(private snackBar: MatSnackBar,
            private router: Router,
            private serv: EventService) {
              this.serv.navBar$.next('home');
             }

ngOnInit() {
  this.isAuth = this.serv.isAuthenticated();
}

connect(): void {
  if (this.admin.name === this.cred.name && this.admin.pass === this.cred.pass) {
    // you're in
    this.serv.login();
    this.snackBar.open('Welcome', 'Thanks', {
      duration: 2000,
    });
    // this.router.navigate(['/events']);
    document.location.reload();
  } else {
    // GTFO
    this.snackBar.open('Wrong login/password', 'Retry', {
      duration: 20000,
    });
  }
}

isFormValid(): boolean {
  return (this.admin.name !== '' && this.admin.pass !== '');
}

}
