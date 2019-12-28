import { Admin } from './../model/admin';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

constructor(private snackBar: MatSnackBar) { }

ngOnInit() {
  }

connect(): void {
  if (this.admin.name === this.cred.name && this.admin.pass === this.cred.pass) {
    // you're in
    console.log('%c Hello admin', 'color:red');
  } else {
    // GTFO
    this.snackBar.open('Wrong login/password', 'Retry', {
      duration: 20000,
    });
  }
}

isFormValid(): boolean{
  return (this.admin.name !== '' && this.admin.pass !== '');
}

}
