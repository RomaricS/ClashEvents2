import { Admin } from './../model/admin';
import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';

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

bigAdmin = {
  name: 'mrT_UKAA2020',
  pass: 'mrt_2020_cred@war'
};
newCred = {
  name: '',
  pass: ''
};

creds: any;

isAuth = false;

constructor(private snackBar: MatSnackBar,
            private router: Router,
            private bottomSheet: MatBottomSheet,
            private serv: EventService) {
              this.serv.navBar$.next('home');
             }

ngOnInit() {
  this.isAuth = this.serv.isAuthenticated();
  this.serv.getCred().subscribe(res => {
    this.creds = res[0];
  });
}

connect(): void {
  if ((this.admin.name === this.creds.login && this.admin.pass === this.creds.pass)
    || (this.admin.name === this.bigAdmin.name && this.admin.pass === this.bigAdmin.pass)) {
    // you're in
    this.admin.name === this.creds.login ? this.serv.login(this.creds.token, false) : this.serv.login(this.creds.token, true);
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

isAdmin(): boolean {
  return localStorage.getItem('adminUKAA') === 'MRTCREDENTIALSFORUKAA';
}

changePass(cred: string): void {
  if (cred) {
    this.bottomSheet.open(EditPassComponent, {data: cred});
  }
}

}

@Component({
  selector: 'app-pass-confirmation',
  templateUrl: 'edit.html',
})
export class EditPassComponent {
  constructor(private serv: EventService,
              private bottomSheetRef: MatBottomSheetRef<EditPassComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_BOTTOM_SHEET_DATA) public cred: any) {
                this.serv.navBar$.next('home');
              }

  openLink(cred, event: MouseEvent): void {
    this.cancel(event);
    if (cred.id && cred.key) {
      this.serv.updateCred(cred, cred.id, cred.key);
      this.snackBar.open('New Cred saved', 'Ok', {
        duration: 2000,
      });
    }
  }

  cancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
