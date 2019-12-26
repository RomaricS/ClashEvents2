import { Event } from './../model/event';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventList: Observable<any>;

  ev: Event[];

  constructor(private serv: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventList = this.serv.getEvents();
    this.eventList.subscribe(res => {
      if (res) {
        this.ev = res.map(this.castData);
        console.log(this.eventList);
      } else {
        console.log('NO DATA');
      }

    });
  }

  castData(d): Event {
    const data: Event = {
        title: d.title,
        id: d.id,
        startsAt: d.startsAt,
        active: d.active,
        townhall: d.townhall,
        playersList: d.playersList
    };
    return data;
  }

}
