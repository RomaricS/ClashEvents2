import { Event } from './../model/event';
import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../event.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventList: Event[];
  showEv = true;

  isAuth = false;

  constructor(private serv: EventService,
              private bottomSheet: MatBottomSheet) {
                this.serv.navBar$.next('events');
              }

  ngOnInit() {
    this.isAuth = this.serv.isAuthenticated();
    this.loadEvents();
  }

  loadEvents() {
    this.serv.getEvents().subscribe(res => {
      if (res && res.length > 0) {
        this.eventList = res.map(this.castData, this).filter(ev => ev.active);
      } else {
        this.showEv = false;
        console.log('NO DATA');
      }
    },
    err => console.log(err));
  }

  castData(d): Event {
    const data: Event = {
        key: d.key,
        title: d.title,
        id: d.id,
        clanSelection: d.clanSelection || false,
        picture: d.picture || 'https://i.ytimg.com/vi/r2BFeSUkNCI/maxresdefault.jpg',
        startsAt: d.startsAt,
        active: d.active,
        townhall: d.townhall.filter(hall => hall.state),
        playersList: d.playersList
    };
    return data;
  }

  delete(key: string): void {
    this.bottomSheet.open(DeleteConfirmationComponent, {data: key});
  }

}

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: 'delete.html',
})
export class DeleteConfirmationComponent {
  constructor(private serv: EventService,
              private bottomSheetRef: MatBottomSheetRef<DeleteConfirmationComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_BOTTOM_SHEET_DATA) public key: any) {
                this.serv.navBar$.next('events');
              }

  openLink(event: MouseEvent): void {
    this.cancel(event);
    this.serv.deleteEvent(this.key);
    this.snackBar.open('Event deleted', 'Ok', {
      duration: 2000,
    });
  }

  cancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
